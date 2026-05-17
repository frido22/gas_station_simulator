import React, { useEffect, useState } from 'react';
import { ArrowPathIcon, CheckBadgeIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { SuccessMessages } from '@/types';
import { useSounds } from '@/hooks/useSounds';
import { formatCurrency, getPumpError } from '@/utils/gameRules';

const SuccessScene: React.FC = () => {
  const { gameState, resetGame } = useGame();
  const { playSound } = useSounds();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomMessage = SuccessMessages[Math.floor(Math.random() * SuccessMessages.length)];
    setMessage(randomMessage);
    playSound('success');
  }, [playSound]);

  const handlePlayAgain = () => {
    playSound('button');
    resetGame();
  };

  return (
    <section className="scene-panel w-full max-w-2xl rounded-[8px] p-5 text-center sm:p-7">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#087f5b] text-white shadow-lg">
        <CheckBadgeIcon className="h-10 w-10" />
      </div>

      <h1 className="text-4xl font-black leading-none text-neutral-950 sm:text-5xl">
        Perfect Pump
      </h1>

      <p className="mx-auto mt-3 max-w-md text-base font-semibold text-neutral-700">
        {message}
      </p>

      <div className="my-6 grid gap-3 text-left sm:grid-cols-3">
        <div className="control-surface rounded-[8px] p-4">
          <div className="text-xs font-black uppercase text-neutral-500">Stopped at</div>
          <div className="mt-1 text-2xl font-black">{formatCurrency(gameState.currentAmount)}</div>
        </div>
        <div className="control-surface rounded-[8px] p-4">
          <div className="text-xs font-black uppercase text-neutral-500">Target</div>
          <div className="mt-1 text-2xl font-black">{formatCurrency(gameState.targetAmount)}</div>
        </div>
        <div className="control-surface rounded-[8px] p-4">
          <div className="text-xs font-black uppercase text-neutral-500">Error</div>
          <div className="mt-1 text-2xl font-black">{formatCurrency(getPumpError(gameState.currentAmount, gameState.targetAmount))}</div>
        </div>
      </div>

      {gameState.highScore > 0 && (
        <div className="mb-5 flex items-center justify-center gap-2 text-sm font-black text-neutral-700">
          <TrophyIcon className="h-5 w-5 text-[#f6c343]" />
          Best perfect target: {formatCurrency(gameState.highScore)}
        </div>
      )}

      <button
        onClick={handlePlayAgain}
        className="primary-button mx-auto flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-[8px] bg-[#d92d20] px-5 text-base font-black uppercase text-white"
        type="button"
      >
        <ArrowPathIcon className="h-5 w-5" />
        Play Again
      </button>
    </section>
  );
};

export default SuccessScene;
