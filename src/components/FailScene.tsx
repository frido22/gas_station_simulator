import React, { useEffect, useState } from 'react';
import { ArrowPathIcon, HomeIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { FailMessages } from '@/types';
import { useSounds } from '@/hooks/useSounds';
import { formatCurrency, getPumpError } from '@/utils/gameRules';

const FailScene: React.FC = () => {
  const { gameState, resetGame, startGame } = useGame();
  const { playSound } = useSounds();
  const [message] = useState(() => FailMessages[Math.floor(Math.random() * FailMessages.length)]);

  useEffect(() => {
    playSound('fail');
  }, [playSound]);

  const handleTryAgain = () => {
    playSound('button');
    startGame();
  };

  const handleRestart = () => {
    playSound('button');
    resetGame();
  };

  const difference = getPumpError(gameState.currentAmount, gameState.targetAmount);
  const isOverflow = gameState.currentAmount > gameState.targetAmount;

  return (
    <section className="scene-panel w-full max-w-2xl rounded-[8px] p-5 text-center sm:p-7">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#d92d20] text-white shadow-lg">
        <XCircleIcon className="h-10 w-10" />
      </div>

      <h1 className="text-4xl font-black leading-none text-neutral-950 sm:text-5xl">
        {isOverflow ? 'Over Target' : 'Missed Target'}
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
          <div className="text-xs font-black uppercase text-neutral-500">{isOverflow ? 'Over by' : 'Short by'}</div>
          <div className="mt-1 text-2xl font-black text-[#d92d20]">{formatCurrency(difference)}</div>
        </div>
      </div>

      <div className="mx-auto grid max-w-sm gap-3">
        <button
          onClick={handleTryAgain}
          className="primary-button flex min-h-14 items-center justify-center gap-2 rounded-[8px] bg-[#d92d20] px-5 text-base font-black uppercase text-white"
          type="button"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Try Same Target
        </button>

        <button
          onClick={handleRestart}
          className="flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-black/15 bg-white/72 px-5 text-base font-black uppercase text-neutral-950 transition hover:bg-white"
          type="button"
        >
          <HomeIcon className="h-5 w-5" />
          Main Menu
        </button>
      </div>
    </section>
  );
};

export default FailScene;
