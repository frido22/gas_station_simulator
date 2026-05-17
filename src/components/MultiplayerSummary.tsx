import React from 'react';
import { ArrowPathIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { formatCurrency } from '@/utils/gameRules';

const MultiplayerSummary: React.FC = () => {
  const { gameState, resetGame } = useGame();
  const sortedPlayers = [...gameState.players].sort((a, b) => a.totalError - b.totalError);
  const winner = sortedPlayers[0];

  return (
    <section className="scene-panel w-full max-w-2xl rounded-[8px] p-5 text-center sm:p-7">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#f6c343] text-neutral-950 shadow-lg">
        <TrophyIcon className="h-10 w-10" />
      </div>

      <h1 className="text-4xl font-black leading-none text-neutral-950">
        Match Complete
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base font-semibold text-neutral-700">
        {winner?.name || 'Winner'} takes it with the lowest total error.
      </p>

      <div className="my-6 overflow-hidden rounded-[8px] border border-black/10 bg-white/72 text-left">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.name}
            className="grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-black/10 px-4 py-3 last:border-b-0"
          >
            <div className={`grid h-8 w-8 place-items-center rounded-full text-sm font-black ${index === 0 ? 'bg-[#f6c343] text-neutral-950' : 'bg-neutral-950 text-white'}`}>
              {index + 1}
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-black text-neutral-950">{player.name}</div>
              <div className="text-xs font-bold uppercase text-neutral-500">Total error</div>
            </div>
            <div className="text-lg font-black text-neutral-950">{formatCurrency(player.totalError)}</div>
          </div>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="primary-button mx-auto flex min-h-14 w-full max-w-sm items-center justify-center gap-2 rounded-[8px] bg-[#d92d20] px-5 text-base font-black uppercase text-white"
        type="button"
      >
        <ArrowPathIcon className="h-5 w-5" />
        Play Again
      </button>
    </section>
  );
};

export default MultiplayerSummary;
