import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { gsap } from 'gsap';
import { useSounds } from '@/hooks/useSounds';

const Leaderboard: React.FC = () => {
  const { leaderboard, resetGame } = useGame();
  const { playSound } = useSounds();
  const [isLoading, setIsLoading] = useState(true);
  
  // Funny titles for different ranks
  const rankTitles = [
    "Gas Guru",
    "Pump Pro",
    "Fuel Fanatic",
    "Nozzle Ninja",
    "Gallon Gladiator",
    "Tank Tactician",
    "Petrol Prodigy",
    "Diesel Deity",
    "Octane Oracle",
    "Fuel Philosopher"
  ];
  
  useEffect(() => {
    // Play sound when leaderboard loads
    playSound('levelUp');
    
    // Animate leaderboard entries
    gsap.from('.leaderboard-title', {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out'
    });
    
    gsap.from('.leaderboard-entry', {
      x: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      delay: 0.3
    });
    
    gsap.from('.back-button', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 1
    });
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [playSound]);
  
  const handlePlayAgain = () => {
    playSound('button');
    resetGame();
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Leaderboard Title */}
      <div className="leaderboard-title mb-6 text-center">
        <h1 className="title-font text-4xl mb-2 text-[#2ec4b6]">
          GLOBAL CHAMPIONS
        </h1>
        <p className="accent-font text-xl text-[#ff6b35]">
          Pump Perfection Hall of Fame
        </p>
      </div>
      
      {/* Leaderboard Table */}
      <div className="w-full max-w-md mb-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-[#2ec4b6]">
        <div className="bg-[#011627] text-white p-3 flex justify-between game-font">
          <span>Rank</span>
          <span>Name</span>
          <span>Score</span>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-10 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#ff6b35] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-white">Loading global scores...</p>
            </div>
          ) : leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <div 
                key={index}
                className="leaderboard-entry flex justify-between items-center p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="game-font text-xl text-[#ff6b35]">#{index + 1}</span>
                  <div>
                    <div className="font-medium text-white">{entry.name}</div>
                    <div className="text-xs text-gray-400 accent-font">{rankTitles[index % rankTitles.length]}</div>
                  </div>
                </div>
                <span className="game-font text-xl text-[#2ec4b6]">${entry.score}</span>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400">
              No scores yet! Be the first to make the global leaderboard!
            </div>
          )}
        </div>
      </div>
      
      {/* Play Again Button */}
      <button
        onClick={handlePlayAgain}
        className="back-button bg-[#ff6b35] text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-opacity-90 transition-colors game-font"
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default Leaderboard;
