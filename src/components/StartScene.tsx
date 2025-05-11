import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';

const StartScene: React.FC = () => {
  const { startGame, gameState, setTargetAmount } = useGame();
  const { playSound } = useSounds();
  const [targetValue, setTargetValue] = useState(Math.max(5, gameState.targetAmount || 5));
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

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 5) {
      setTargetValue(value);
      setTargetAmount(value);
    } else if (!isNaN(value) && value < 5) {
      setTargetValue(5);
      setTargetAmount(5);
    }
  };

  const adjustTarget = (amount: number) => {
    const step = 5;
    const newValue = targetValue + amount * step;
    if (newValue >= 5) {
      setTargetValue(newValue);
      setTargetAmount(newValue);
      playSound('button');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <h1 className="text-5xl font-bold mb-4 text-black title-font animate-float">
        Gas Station Simulator
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
        <div className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg w-full max-w-xs">
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
              min="5"
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
        <div className="mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg w-full max-w-xs">
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

      {gameState.highScore > 0 && (
        <p className="mt-4 text-black">
          Your highest exact amount: <span className="font-bold text-primary">${gameState.highScore}.00</span>
        </p>
      )}
    </div>
  );
};

export default StartScene;
