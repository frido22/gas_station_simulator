import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import StartScene from './StartScene';
import GasPump from './GasPump';
import SuccessScene from './SuccessScene';
import FailScene from './FailScene';
import Leaderboard from './Leaderboard';
import SoundController from './SoundController';
import MultiplayerResult from './MultiplayerResult';
import MultiplayerSummary from './MultiplayerSummary';
import GameBackground from './GameBackground';
import { initializeGame, preloadAssets } from '@/utils/gameInitializer';

const Game: React.FC = () => {
  const { gameScene } = useGame();
  
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
      
      {/* Sound controller */}
      <SoundController />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md h-full flex flex-col items-center justify-center p-4">
        {renderScene()}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-2 w-full text-center text-xs text-gray-400">
        Pump Perfection &copy; 2025 | The Ultimate Gas Station Simulator
      </div>
    </div>
  );
};

export default Game;
