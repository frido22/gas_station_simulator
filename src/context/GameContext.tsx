"use client";
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { GameState, GameScene, MultiplayerPlayer } from '@/types';
import { isPerfectStop } from '@/utils/gameRules';

// Define the initial game state
const initialGameState: GameState = {
  isPlaying: false,
  isPumping: false,
  targetAmount: 20.00,
  currentAmount: 0.00,
  score: 0,
  highScore: 0,
  gameOver: false,
  success: false,
  level: 1,
  mode: 'single',
  players: [],
  targets: [],
  currentPlayer: 0,
  currentRound: 1,
  roundsPerPlayer: 3,
  lastTurnResult: undefined,
};

// Define the context type
interface GameContextType {
  gameState: GameState;
  gameScene: GameScene;
  startGame: (names?: string[]) => void;
  resetGame: () => void;
  startPumping: () => void;
  stopPumping: () => void;
  setGameScene: (scene: GameScene) => void;
  setTargetAmount: (amount: number) => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameScene, setGameScene] = useState<GameScene>('start');
  const pumpIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load high score from local storage
  useEffect(() => {
    const storedHighScore = localStorage.getItem('pumpPerfectionHighScore');
    
    if (storedHighScore) {
      const timeout = window.setTimeout(() => {
        setGameState(prev => ({ ...prev, highScore: Number(storedHighScore) }));
      }, 0);

      return () => window.clearTimeout(timeout);
    }
  }, []);

  // Set target amount
  const setTargetAmount = (amount: number) => {
    // Ensure amount is a round number
    const roundedAmount = Math.round(amount);
    setGameState(prev => ({ ...prev, targetAmount: roundedAmount }));
  };

  // Start the game
  const startGame = (names?: string[]) => {
    if (names && names.length > 1) {
      // Multiplayer mode
      const players: MultiplayerPlayer[] = names.map(n => ({ name: n, totalError: 0 }));
      const rounds = initialGameState.roundsPerPlayer;
      const targets = players.map(() =>
        Array.from({ length: rounds }, () => (Math.floor(Math.random() * 8) + 1) * 5)
      ); // 5–40 step 5
      setGameState({
        ...initialGameState,
        isPlaying: true,
        mode: 'multi',
        players,
        targets,
        targetAmount: targets[0][0],
        currentPlayer: 0,
        currentRound: 1,
        roundsPerPlayer: rounds,
        highScore: gameState.highScore,
      });
    } else {
      // Single player
      setGameState({
        ...initialGameState,
        isPlaying: true,
        targetAmount: gameState.targetAmount || 20,
        highScore: gameState.highScore,
      });
    }
    
    setGameScene('game');
  };

  // Reset the game
  const resetGame = () => {
    if (pumpIntervalRef.current) {
      clearInterval(pumpIntervalRef.current);
      pumpIntervalRef.current = null;
    }
    
    setGameState({
      ...initialGameState,
      highScore: gameState.highScore,
      level: 1,
    });
    
    setGameScene('start');
  };

  // Start pumping gas
  const startPumping = () => {
    if (pumpIntervalRef.current) return;
    
    setGameState(prev => ({ ...prev, isPumping: true }));
    
    const interval = setInterval(() => {
      setGameState(prev => {
        const increment = Math.random() * 0.28 + 0.12;
        const newAmount = parseFloat((prev.currentAmount + increment).toFixed(2));
        
        return { ...prev, currentAmount: newAmount };
      });
    }, 150);
    
    pumpIntervalRef.current = interval;
  };

  // Stop pumping gas
  const stopPumping = () => {
    if (!pumpIntervalRef.current) return;

    clearInterval(pumpIntervalRef.current);
    pumpIntervalRef.current = null;
    
    setGameState(prev => {
      if (!prev.isPumping) return prev;

      const finalPumpedAmount = prev.currentAmount;

      if (prev.mode === 'multi') {
        // Multiplayer turn logic
        const targetPlayed = prev.targetAmount; // Target for the turn just completed
        const error = Math.abs(finalPumpedAmount - targetPlayed);
        const playerIndex = prev.currentPlayer;
        const playerName = prev.players[playerIndex]?.name || 'Player';
        const roundPlayed = prev.currentRound;
        
        const players = prev.players.map((p, idx) =>
          idx === prev.currentPlayer
            ? { ...p, totalError: p.totalError + error }
            : p
        );
        let nextPlayer = prev.currentPlayer + 1;
        let nextRound = prev.currentRound;
        if (nextPlayer >= players.length) {
          nextPlayer = 0;
          nextRound++;
        }
        const isGameOver = nextRound > prev.roundsPerPlayer;
        const nextTarget = isGameOver ? prev.targetAmount : prev.targets[nextPlayer][nextRound - 1];
        setGameScene(isGameOver ? 'multiplayerSummary' : 'multiplayerResult');
        
        // Store results of the completed turn
        const lastTurnResult = {
          playerName: playerName,
          targetAmount: targetPlayed,
          amountPumped: finalPumpedAmount,
          error: error,
          roundPlayed: roundPlayed,
        };
        
        return {
          ...prev,
          isPumping: false,
          currentAmount: 0,
          players,
          currentPlayer: nextPlayer,
          currentRound: nextRound,
          targetAmount: nextTarget,
          gameOver: isGameOver,
          lastTurnResult: lastTurnResult,
        };
      } else {
        // Single player end
        const isExact = isPerfectStop(finalPumpedAmount, prev.targetAmount);
        const newScore = isExact ? Math.round(prev.targetAmount) : 0;
        const newHighScore = isExact && prev.targetAmount > prev.highScore ? Math.round(prev.targetAmount) : prev.highScore;
        // Persist high score immediately when it is beaten
        if (newHighScore > prev.highScore) {
          localStorage.setItem('pumpPerfectionHighScore', newHighScore.toString());
        }
        setGameScene(isExact ? 'success' : 'fail');

        return {
          ...prev,
          isPumping: false,
          gameOver: true,
          success: isExact,
          score: newScore,
          highScore: newHighScore,
          level: isExact ? prev.level + 1 : prev.level,
        };
      }
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pumpIntervalRef.current) {
        clearInterval(pumpIntervalRef.current);
        pumpIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameScene,
        startGame,
        resetGame,
        startPumping,
        stopPumping,
        setGameScene,
        setTargetAmount,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Create a hook to use the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
