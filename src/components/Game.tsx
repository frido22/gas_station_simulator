'use client';

import React, { useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';
import StartScene from './StartScene';
import GasPump from './GasPump';
import SuccessScene from './SuccessScene';
import FailScene from './FailScene';
import MultiplayerResult from './MultiplayerResult';
import MultiplayerSummary from './MultiplayerSummary';
import GameBackground from './GameBackground';
import { initializeGame, preloadAssets } from '@/utils/gameInitializer';

const Game: React.FC = () => {
  const { gameScene } = useGame();
  const { muted, toggleMute } = useSounds();

  useEffect(() => {
    const cleanup = initializeGame();
    preloadAssets();

    return cleanup;
  }, []);

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
      case 'multiplayerResult':
        return <MultiplayerResult />;
      case 'multiplayerSummary':
        return <MultiplayerSummary />;
      default:
        return <StartScene />;
    }
  };

  return (
    <main className="game-shell relative flex min-h-screen w-full overflow-hidden text-neutral-950">
      <GameBackground scene={gameScene} />

      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-black uppercase shadow-sm backdrop-blur-md">
          Gas Station Simulator
        </div>

        <button
          onClick={toggleMute}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white"
          aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
          title={muted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {muted ? (
            <SpeakerXMarkIcon className="h-5 w-5" />
          ) : (
            <SpeakerWaveIcon className="h-5 w-5" />
          )}
        </button>
      </header>

      <div className="relative z-10 flex min-h-screen w-full min-w-0 items-center justify-center px-4 pb-6 pt-20 sm:px-6">
        <div className="flex w-full min-w-0 max-w-5xl items-center justify-center">
          {renderScene()}
        </div>
      </div>
    </main>
  );
};

export default Game;
