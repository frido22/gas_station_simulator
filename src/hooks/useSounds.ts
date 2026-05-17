import { useCallback, useEffect, useState } from 'react';

const SOUND_FILES = {
  pump: '/sounds/pump.mp3',
  success: '/sounds/success.mp3',
  fail: '/sounds/fail.mp3',
  button: '/sounds/button.mp3',
  levelUp: '/sounds/levelup.mp3',
  countdown: '/sounds/countdown.mp3',
  splash: '/sounds/splash.mp3',
};

type SoundInstance = {
  play: () => void;
  stop: () => void;
};

type SoundMap = Record<string, SoundInstance>;
type HowlerController = {
  mute: (muted: boolean) => void;
};

export const useSounds = () => {
  const [sounds, setSounds] = useState<SoundMap>({});
  const [howler, setHowler] = useState<HowlerController | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadedSounds: SoundMap = {};

    const setupSounds = async () => {
      const { Howl, Howler } = await import('howler');
      if (cancelled) return;

      loadedSounds = Object.fromEntries(
        Object.entries(SOUND_FILES).map(([key, path]) => [
          key,
          new Howl({
            src: [path],
            volume: key === 'pump' ? 0.35 : 0.68,
            preload: true,
            html5: true,
            loop: key === 'pump',
          }),
        ])
      );

      const savedMute = window.localStorage.getItem('pumpPerfectionMuted') === 'true';
      Howler.mute(savedMute);

      setSounds(loadedSounds);
      setHowler(Howler);
      setMuted(savedMute);
      setLoaded(true);
    };

    setupSounds();

    return () => {
      cancelled = true;
      Object.values(loadedSounds).forEach(sound => sound.stop());
    };
  }, []);

  const playSound = useCallback((sound: string) => {
    if (loaded && sounds[sound]) {
      sounds[sound].play();
    }
  }, [loaded, sounds]);

  const stopSound = useCallback((sound: string) => {
    if (loaded && sounds[sound]) {
      sounds[sound].stop();
    }
  }, [loaded, sounds]);

  const toggleMute = useCallback(() => {
    const newMuted = !muted;
    setMuted(newMuted);
    howler?.mute(newMuted);
    window.localStorage.setItem('pumpPerfectionMuted', newMuted.toString());
  }, [howler, muted]);

  return {
    sounds,
    loaded,
    muted,
    playSound,
    stopSound,
    toggleMute,
  };
};
