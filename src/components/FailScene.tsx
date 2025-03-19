import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { FailMessages } from '@/types';
import { useSounds } from '@/hooks/useSounds';

const FailScene: React.FC = () => {
  const { gameState, resetGame, startGame } = useGame();
  const { playSound } = useSounds();
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Select a random fail message
    const randomMessage = FailMessages[Math.floor(Math.random() * FailMessages.length)];
    setMessage(randomMessage);
    
    // Play fail sound
    playSound('fail');
  }, [playSound]);
  
  const handleTryAgain = () => {
    playSound('button');
    startGame();
  };
  
  const handleRestart = () => {
    playSound('button');
    resetGame();
  };
  
  // Calculate how close they were to the target
  const difference = Math.abs(gameState.targetAmount - gameState.currentAmount).toFixed(2);
  const isOverflow = gameState.currentAmount > gameState.targetAmount;
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-red-500 game-font">
          {isOverflow ? 'OVERFLOW!' : 'MISSED IT!'}
        </h1>
        
        <div className="mb-6">
          <div className="text-5xl font-bold text-gray-700 mb-2">
            ${gameState.currentAmount.toFixed(2)}
          </div>
          <p className="text-gray-600">
            Target: ${gameState.targetAmount.toFixed(2)}
          </p>
          <p className="text-red-500 mt-2">
            {isOverflow 
              ? `You overflowed by $${difference}!` 
              : `You were $${difference} away from the target!`}
          </p>
        </div>
        
        <p className="text-lg mb-6 accent-font text-dark">
          {message}
        </p>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleTryAgain}
            className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors game-font"
          >
            TRY AGAIN (SAME TARGET)
          </button>
          
          <button
            onClick={handleRestart}
            className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors game-font"
          >
            BACK TO START
          </button>
        </div>
        
        {gameState.highScore > 0 && (
          <p className="mt-6 text-gray-700">
            Your highest exact amount: <span className="font-bold text-primary">${gameState.highScore}.00</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default FailScene;
