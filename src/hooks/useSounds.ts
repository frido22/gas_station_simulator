import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { GameSound } from '@/types';

// Define sound files
const SOUND_FILES = {
  pump: '/sounds/pump.mp3',
  success: '/sounds/success.mp3',
  fail: '/sounds/fail.mp3',
  button: '/sounds/button.mp3',
  levelUp: '/sounds/levelup.mp3',
  countdown: '/sounds/countdown.mp3',
  splash: '/sounds/splash.mp3'
};

export const useSounds = () => {
  const [sounds, setSounds] = useState<{[key: string]: Howl}>({});
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(false);
  
  // Initialize sounds
  useEffect(() => {
    const soundEffects: {[key: string]: Howl} = {};
    
    // Create Howl instances for each sound
    Object.entries(SOUND_FILES).forEach(([key, path]) => {
      soundEffects[key] = new Howl({
        src: [path],
        volume: 0.7,
        preload: true,
        html5: true, // Better for mobile
      });
    });
    
    setSounds(soundEffects);
    setLoaded(true);
    
    // Check if user previously muted sounds
    const savedMute = localStorage.getItem('pumpPerfectionMuted');
    if (savedMute === 'true') {
      setMuted(true);
      Howler.mute(true);
    }
    
    return () => {
      // Stop all sounds when component unmounts
      Object.values(soundEffects).forEach(sound => sound.stop());
    };
  }, []);
  
  // Play a sound
  const playSound = (sound: GameSound) => {
    if (loaded && sounds[sound]) {
      sounds[sound].play();
    }
  };
  
  // Stop a sound
  const stopSound = (sound: GameSound) => {
    if (loaded && sounds[sound]) {
      sounds[sound].stop();
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    Howler.mute(newMuted);
    localStorage.setItem('pumpPerfectionMuted', newMuted.toString());
  };
  
  return {
    sounds,
    loaded,
    muted,
    playSound,
    stopSound,
    toggleMute
  };
};
