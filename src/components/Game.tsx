import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';
import StartScene from './StartScene';
import GasPump from './GasPump';
import SuccessScene from './SuccessScene';
import FailScene from './FailScene';
import Leaderboard from './Leaderboard';
import MultiplayerResult from './MultiplayerResult';
import MultiplayerSummary from './MultiplayerSummary';
import GameBackground from './GameBackground';
import { initializeGame, preloadAssets } from '@/utils/gameInitializer';

const Game: React.FC = () => {
  const { gameScene } = useGame();
  const { muted, toggleMute } = useSounds();

  // Initialize game
  useEffect(() => {
    // Initialize game and get cleanup function
    const cleanup = initializeGame();
    
    // Preload assets
    preloadAssets();
    
    // Return cleanup function
    return cleanup;
  }, []);
  
  // Handle mobile viewport height issues
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);
  
  // Render the appropriate scene based on game state
  const renderScene = () => {
    switch (gameScene) {
      case 'start':
        return <StartScene />;
      case 'game':
        return <GasPump />;
      case 'success':
        return <SuccessScene />;
      case 'fail':
        return <FailScene />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'multiplayerResult':
        return <MultiplayerResult />;
      case 'multiplayerSummary':
        return <MultiplayerSummary />;
      default:
        return <StartScene />;
    }
  };
  
  return (
    <div 
      className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f6f7f8] to-white overflow-hidden"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background animations */}
      <GameBackground scene={gameScene} />
      
      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100 transition-all"
        aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md h-full flex flex-col items-center justify-center p-4">
        {renderScene()}
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-gray-800 text-center p-2 absolute bottom-0 left-0">
        <p className="text-xs text-gray-400">Gas Station Simulator &copy; 2025 | The Ultimate Gas Station Simulator</p>
      </footer>
    </div>
  );
};

export default Game;
