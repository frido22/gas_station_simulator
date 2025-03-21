import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';

const StartScene: React.FC = () => {
  const { startGame, gameState, setTargetAmount, setGameScene } = useGame();
  const { playSound } = useSounds();
  const [targetValue, setTargetValue] = useState(gameState.targetAmount || 20);
  
  const handleStartGame = () => {
    playSound('button');
    startGame();
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
      <h1 className="text-5xl font-bold mb-4 text-primary title-font animate-float">
        Pump Perfection
      </h1>
      
      <p className="text-xl mb-8 accent-font text-dark">
        Stop at EXACTLY the right amount!
      </p>
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-xs">
        <h2 className="text-lg font-bold mb-2 game-font text-secondary">
          Choose Your Target Amount:
        </h2>
        
        <div className="flex items-center justify-center mb-4">
          <button 
            className="w-10 h-10 bg-primary text-white rounded-l-lg font-bold text-xl"
            onClick={() => adjustTarget(-5)}
          >
            -
          </button>
          
          <input
            type="number"
            value={targetValue}
            onChange={handleTargetChange}
            className="w-24 h-10 text-center text-2xl font-bold border-y border-gray-300 bg-gray-200"
            min="1"
          />
          
          <button 
            className="w-10 h-10 bg-primary text-white rounded-r-lg font-bold text-xl"
            onClick={() => adjustTarget(5)}
          >
            +
          </button>
        </div>
        
        <p className="text-sm text-gray-600 italic">
          Try to stop pumping at exactly ${targetValue}.00
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2 game-font text-dark">How to Play:</h2>
        <ul className="text-left text-gray-700">
          <li className="mb-2">• Press and hold to pump gas</li>
          <li className="mb-2">• Release to stop pumping</li>
          <li className="mb-2">• Hit the target amount exactly!</li>
          <li>• Your score is the highest amount you hit exactly</li>
        </ul>
      </div>
      
      <button
        onClick={handleStartGame}
        className="pump-button bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-full text-xl game-font transition-all"
      >
        START PUMPING!
      </button>
      
      <button
        onClick={handleViewLeaderboard}
        className="mt-4 bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-full text-lg game-font transition-all flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 011 1v12a1 1 0 01-1 1H6a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v8a1 1 0 001 1h10V5H6z" clipRule="evenodd" />
          <path d="M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        </svg>
        GLOBAL LEADERBOARD
      </button>
      
      {gameState.highScore > 0 && (
        <p className="mt-4 text-gray-700">
          Your highest exact amount: <span className="font-bold text-primary">${gameState.highScore}.00</span>
        </p>
      )}
    </div>
  );
};

export default StartScene;
