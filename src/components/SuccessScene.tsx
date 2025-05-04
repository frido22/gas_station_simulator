import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { SuccessMessages } from '@/types';
import { useSounds } from '@/hooks/useSounds';

const SuccessScene: React.FC = () => {
  const { gameState, resetGame, setGameScene, addToLeaderboard } = useGame();
  const { playSound } = useSounds();
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Select a random success message
    const randomMessage = SuccessMessages[Math.floor(Math.random() * SuccessMessages.length)];
    setMessage(randomMessage);
    
    // Play success sound
    playSound('success');
    
    // Confetti animation would be triggered here
  }, [playSound]);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('button');
    
    // Add player to leaderboard with their name
    addToLeaderboard(playerName);
  };
  
  const handlePlayAgain = () => {
    playSound('button');
    resetGame();
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-primary game-font">
          PERFECT PUMP!
        </h1>
        
        <div className="mb-6">
          <div className="text-5xl font-bold text-secondary mb-2">
            ${gameState.currentAmount.toFixed(2)}
          </div>
          <p className="text-gray-600">
            Target: ${gameState.targetAmount.toFixed(2)}
          </p>
        </div>
        
        <p className="text-lg mb-6 accent-font text-dark">
          {message}
        </p>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your name for the leaderboard:
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Your name"
              maxLength={15}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors game-font"
          >
            SAVE SCORE
          </button>
        </form>
        
        <div className="flex space-x-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors game-font"
          >
            PLAY AGAIN
          </button>
          
          <button
            onClick={() => {
              playSound('button');
              setGameScene('leaderboard');
            }}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors game-font"
          >
            LEADERBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScene;
