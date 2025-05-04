import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';

const StartScene: React.FC = () => {
  const { startGame, gameState, setTargetAmount, setGameScene } = useGame();
  const { playSound } = useSounds();
  const [targetValue, setTargetValue] = useState(gameState.targetAmount || 20);
  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array.from({ length: 2 }, (_, i) => `Player ${i + 1}`)
  );

  useEffect(() => {
    setPlayerNames(prev => {
      let names = [...prev];
      if (numPlayers > names.length) {
        for (let i = names.length; i < numPlayers; i++) {
          names.push(`Player ${i + 1}`);
        }
      } else {
        names = names.slice(0, numPlayers);
      }
      return names;
    });
  }, [numPlayers]);

  const handleStartGame = () => {
    playSound('button');
    if (mode === 'multi') {
      startGame(playerNames);
    } else {
      startGame();
    }
  };

  const handleViewLeaderboard = () => {
    playSound('button');
    setGameScene('leaderboard');
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setTargetValue(value);
      setTargetAmount(value);
    }
  };

  const adjustTarget = (amount: number) => {
    const newValue = targetValue + amount;
    if (newValue > 0) {
      setTargetValue(newValue);
      setTargetAmount(newValue);
      playSound('button');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <h1 className="text-5xl font-bold mb-4 text-black title-font animate-float">
        Pump Perfection
      </h1>

      <p className="text-xl mb-8 accent-font text-black">
        Stop at EXACTLY the right amount!
      </p>

      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => setMode('single')}
          className={`py-2 px-4 rounded ${mode === 'single' ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
        >
          Single Player
        </button>
        <button
          onClick={() => setMode('multi')}
          className={`py-2 px-4 rounded ${mode === 'multi' ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
        >
          Multiplayer
        </button>
      </div>

      {mode === 'single' ? (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-xs">
          <h2 className="text-lg font-bold mb-2 game-font text-black">
            Choose Your Target Amount:
          </h2>

          <div className="flex items-center justify-center mb-4">
            <button
              className="w-10 h-10 bg-primary text-white rounded-l-lg font-bold text-xl"
              onClick={() => adjustTarget(-1)}
            >
              -
            </button>

            <input
              type="number"
              value={targetValue}
              onChange={handleTargetChange}
              className="w-24 h-10 text-center text-2xl font-bold border-y border-gray-300 bg-gray-200 text-black"
              min="1"
            />

            <button
              className="w-10 h-10 bg-primary text-white rounded-r-lg font-bold text-xl"
              onClick={() => adjustTarget(1)}
            >
              +
            </button>
          </div>

          <p className="text-sm text-black italic">
            Try to stop pumping at exactly ${targetValue}.00
          </p>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-xs">
          <h2 className="text-lg font-bold mb-2 game-font text-black">
            Number of Players:
          </h2>

          <input
            type="number"
            min="2"
            max="9"
            value={numPlayers}
            onChange={e => {
              const val = parseInt(e.target.value, 10);
              if (val >= 2 && val <= 9) setNumPlayers(val);
            }}
            className="w-16 h-10 text-center text-xl border border-gray-300 rounded mb-4 text-black"
          />

          {playerNames.map((name, i) => (
            <input
              key={i}
              type="text"
              value={name}
              onChange={e => {
                const namesCopy = [...playerNames];
                namesCopy[i] = e.target.value;
                setPlayerNames(namesCopy);
              }}
              placeholder={`Player ${i + 1}`}
              className="w-full h-10 text-center text-lg border border-gray-300 bg-gray-200 rounded mb-2 text-black placeholder-gray-500"
            />
          ))}
        </div>
      )}

      <button
        onClick={handleStartGame}
        className="pump-button bg-primary hover:bg-opacity-90 text-black font-bold py-4 px-8 rounded-full text-xl game-font transition-all"
      >
        {mode === 'single' ? 'START PUMPING!' : 'START MULTIPLAYER'}
      </button>

      <button
        onClick={handleViewLeaderboard}
        className="mt-4 bg-secondary hover:bg-opacity-90 text-black font-bold py-3 px-6 rounded-full text-lg game-font transition-all flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 011 1v12a1 1 0 01-1 1H6a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v8a1 1 0 001 1h10V5H6z" clipRule="evenodd" />
          <path d="M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        </svg>
        GLOBAL LEADERBOARD
      </button>

      {gameState.highScore > 0 && (
        <p className="mt-4 text-black">
          Your highest exact amount: <span className="font-bold text-primary">${gameState.highScore}.00</span>
        </p>
      )}
    </div>
  );
};

export default StartScene;
