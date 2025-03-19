import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

const SoundController: React.FC = () => {
  const [muted, setMuted] = useState(false);
  const { sounds } = useGame();
  
  useEffect(() => {
    // Check if user previously muted sounds
    const savedMute = localStorage.getItem('pumpPerfectionMuted');
    if (savedMute === 'true') {
      setMuted(true);
      // Mute all sounds
      Object.values(sounds).forEach(sound => {
        if (sound && typeof sound.mute === 'function') {
          sound.mute(true);
        }
      });
    }
  }, [sounds]);
  
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    
    // Mute/unmute all sounds
    Object.values(sounds).forEach(sound => {
      if (sound && typeof sound.mute === 'function') {
        sound.mute(newMuted);
      }
    });
    
    localStorage.setItem('pumpPerfectionMuted', newMuted.toString());
  };
  
  return (
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
  );
};

export default SoundController;
