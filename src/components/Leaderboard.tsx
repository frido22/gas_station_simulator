import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { gsap } from 'gsap';

const Leaderboard: React.FC = () => {
  const { leaderboard, resetGame } = useGame();
  
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
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-gradient-to-b from-[#f6f7f8] to-white">
      {/* Leaderboard Title */}
      <div className="leaderboard-title mb-6 text-center">
        <h1 className="title-font text-4xl mb-2 text-[#011627]">
          TOP PUMPERS
        </h1>
        <p className="accent-font text-xl text-[#2ec4b6]">
          Gas Station Hall of Fame
        </p>
      </div>
      
      {/* Leaderboard Table */}
      <div className="w-full max-w-md mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#011627] text-white p-3 flex justify-between game-font">
          <span>Rank</span>
          <span>Name</span>
          <span>Score</span>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <div 
                key={index}
                className="leaderboard-entry flex justify-between items-center p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="game-font text-xl text-[#ff6b35]">#{index + 1}</span>
                  <div>
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-xs text-gray-500 accent-font">{rankTitles[index % rankTitles.length]}</div>
                  </div>
                </div>
                <span className="game-font text-xl text-[#2ec4b6]">{entry.score}</span>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No scores yet! Be the first to make the leaderboard!
            </div>
          )}
        </div>
      </div>
      
      {/* Fun Facts */}
      <div className="mb-6 text-center max-w-sm">
        <p className="accent-font text-sm text-gray-600">
          Did you know? The average person spends 2 weeks of their life at gas stations!
          <br />
          (Not a real fact, but sounds plausible)
        </p>
      </div>
      
      {/* Back Button */}
      <button
        onClick={resetGame}
        className="back-button pump-button bg-[#ff6b35] text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-[#e85d2e] transition-all game-font"
      >
        BACK TO START
      </button>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 opacity-50">
        <div className="text-[#011627] accent-font text-xs -rotate-12">
          Legends Only!
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 opacity-50">
        <div className="text-[#011627] accent-font text-xs rotate-12">
          Pump or Perish!
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
