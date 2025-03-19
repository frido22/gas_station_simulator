import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, GameScene, Player } from '@/types';
import { Howl } from 'howler';

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
};

// Define the context type
interface GameContextType {
  gameState: GameState;
  gameScene: GameScene;
  leaderboard: Player[];
  sounds: {[key: string]: Howl};
  startGame: () => void;
  resetGame: () => void;
  startPumping: () => void;
  stopPumping: () => void;
  setGameScene: (scene: GameScene) => void;
  addToLeaderboard: (name: string) => void;
  setTargetAmount: (amount: number) => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Create a provider component
export const GameProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameScene, setGameScene] = useState<GameScene>('start');
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [sounds, setSounds] = useState<{[key: string]: Howl}>({});
  const [pumpInterval, setPumpInterval] = useState<NodeJS.Timeout | null>(null);

  // Load high score from local storage
  useEffect(() => {
    const storedHighScore = localStorage.getItem('pumpPerfectionHighScore');
    const storedLeaderboard = localStorage.getItem('pumpPerfectionLeaderboard');
    
    if (storedHighScore) {
      setGameState(prev => ({ ...prev, highScore: Number(storedHighScore) }));
    }
    
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }

    // Initialize sounds
    const soundEffects = {
      pump: new Howl({ src: ['/sounds/pump.mp3'], volume: 0.5 }),
      success: new Howl({ src: ['/sounds/success.mp3'], volume: 0.7 }),
      fail: new Howl({ src: ['/sounds/fail.mp3'], volume: 0.7 }),
      button: new Howl({ src: ['/sounds/button.mp3'], volume: 0.5 }),
      levelUp: new Howl({ src: ['/sounds/levelup.mp3'], volume: 0.7 }),
      splash: new Howl({ src: ['/sounds/splash.mp3'], volume: 0.7 }),
    };
    
    setSounds(soundEffects);

    // Cleanup
    return () => {
      if (pumpInterval) clearInterval(pumpInterval);
    };
  }, [pumpInterval]);

  // Set target amount
  const setTargetAmount = (amount: number) => {
    // Ensure amount is a round number
    const roundedAmount = Math.round(amount);
    setGameState(prev => ({ ...prev, targetAmount: roundedAmount }));
  };

  // Start the game
  const startGame = () => {
    sounds.button?.play();
    
    setGameState({
      ...initialGameState,
      isPlaying: true,
      targetAmount: gameState.targetAmount || 20, // Use existing target or default to 20
      level: gameState.level,
      highScore: gameState.highScore,
    });
    
    setGameScene('game');
  };

  // Reset the game
  const resetGame = () => {
    sounds.button?.play();
    
    if (pumpInterval) clearInterval(pumpInterval);
    
    setGameState({
      ...initialGameState,
      highScore: gameState.highScore,
      level: 1,
    });
    
    setGameScene('start');
  };

  // Start pumping gas
  const startPumping = () => {
    if (pumpInterval) return;
    
    sounds.pump?.play();
    
    setGameState(prev => ({ ...prev, isPumping: true }));
    
    const interval = setInterval(() => {
      setGameState(prev => {
        // Increment by a random amount between 0.1 and 0.5
        const increment = Math.random() * 0.4 + 0.1;
        const newAmount = parseFloat((prev.currentAmount + increment).toFixed(2));
        
        return { ...prev, currentAmount: newAmount };
      });
    }, 100);
    
    setPumpInterval(interval);
  };

  // Stop pumping gas
  const stopPumping = () => {
    if (pumpInterval) {
      clearInterval(pumpInterval);
      setPumpInterval(null);
    }
    
    setGameState(prev => {
      // Check if we hit the exact target amount (must be exactly equal)
      const isExact = prev.targetAmount === prev.currentAmount;
      
      // Calculate score - it's just the amount if exact, otherwise 0
      let newScore = 0;
      if (isExact) {
        newScore = Math.round(prev.currentAmount);
        sounds.success?.play();
      } else {
        sounds.fail?.play();
      }
      
      // Update high score if we hit exactly and it's higher than current high score
      const isHighScore = isExact && newScore > prev.highScore;
      
      // End game based on whether we hit exactly
      endGame(isExact);
      
      return { 
        ...prev, 
        isPumping: false, 
        gameOver: true, 
        success: isExact,
        score: newScore,
        highScore: isHighScore ? newScore : prev.highScore
      };
    });
  };

  // End the game
  const endGame = (success: boolean) => {
    if (success) {
      sounds.success?.play();
      setGameScene('success');
      
      // Update high score in local storage if we hit exactly and it's higher
      if (gameState.score > gameState.highScore) {
        localStorage.setItem('pumpPerfectionHighScore', gameState.score.toString());
      }
      
      // Level up for next round
      setGameState(prev => ({ 
        ...prev,
        level: prev.level + 1
      }));
    } else {
      sounds.fail?.play();
      setGameScene('fail');
    }
  };

  // Add player to leaderboard
  const addToLeaderboard = (name: string) => {
    const newEntry: Player = {
      name: name || 'Anonymous',
      score: gameState.score
    };
    
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('pumpPerfectionLeaderboard', JSON.stringify(updatedLeaderboard));
    
    setGameScene('leaderboard');
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (pumpInterval) {
        clearInterval(pumpInterval);
      }
    };
  }, [pumpInterval]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameScene,
        leaderboard,
        sounds,
        startGame,
        resetGame,
        startPumping,
        stopPumping,
        setGameScene,
        addToLeaderboard,
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
