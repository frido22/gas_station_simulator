import React from 'react';
import { ArrowRightIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { formatCurrency } from '@/utils/gameRules';

const MultiplayerResult: React.FC = () => {
  const { gameState, setGameScene } = useGame();
  const { players, currentPlayer, roundsPerPlayer, lastTurnResult } = gameState;

  if (!lastTurnResult) {
    return (
      <section className="scene-panel w-full max-w-xl rounded-[8px] p-6 text-center">
        <p className="font-bold text-neutral-800">Waiting for results...</p>
      </section>
    );
  }

  const { playerName, targetAmount, amountPumped, error, roundPlayed } = lastTurnResult;
  const nextPlayerName = players[currentPlayer]?.name || 'Next Player';

  return (
    <section className="scene-panel w-full max-w-2xl rounded-[8px] p-5 text-center sm:p-7">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-neutral-950 text-white shadow-lg">
        <ChartBarIcon className="h-9 w-9" />
      </div>

      <h1 className="text-4xl font-black leading-none text-neutral-950">
        {playerName}&apos;s Result
      </h1>
      <p className="mt-3 text-base font-semibold text-neutral-700">
        Round {roundPlayed} of {roundsPerPlayer}
      </p>

      <div className="my-6 grid gap-3 text-left sm:grid-cols-3">
        <div className="control-surface rounded-[8px] p-4">
          <div className="text-xs font-black uppercase text-neutral-500">Target</div>
          <div className="mt-1 text-2xl font-black">{formatCurrency(targetAmount)}</div>
        </div>
        <div className="control-surface rounded-[8px] p-4">
          <div className="text-xs font-black uppercase text-neutral-500">Pumped</div>
          <div className="mt-1 text-2xl font-black">{formatCurrency(amountPumped)}</div>
        </div>
        <div className="control-surface rounded-[8px] p-4">
          <div className="text-xs font-black uppercase text-neutral-500">Error</div>
          <div className="mt-1 text-2xl font-black text-[#d92d20]">{formatCurrency(error)}</div>
        </div>
      </div>

      <button
        onClick={() => setGameScene('game')}
        className="primary-button mx-auto flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-[8px] bg-[#d92d20] px-5 text-base font-black uppercase text-white"
        type="button"
      >
        Next: {nextPlayerName}
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </section>
  );
};

export default MultiplayerResult;
