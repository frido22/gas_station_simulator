import React, { useEffect } from 'react';
import { ArrowLeftIcon, BoltIcon, FireIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';
import {
  formatCurrency,
  GAS_PRICE_PER_GALLON,
  getPrecisionLabel,
  isPerfectStop,
} from '@/utils/gameRules';

export const GasPump: React.FC = () => {
  const { gameState, startPumping, stopPumping, setGameScene } = useGame();
  const { isPumping, currentAmount, targetAmount } = gameState;
  const { playSound, stopSound } = useSounds();
  const statusLabel = getPrecisionLabel(currentAmount, targetAmount);
  const gallons = currentAmount / GAS_PRICE_PER_GALLON;
  const isInPerfectZone = isPerfectStop(currentAmount, targetAmount);
  const isOverTarget = currentAmount > targetAmount;

  useEffect(() => {
    if (isPumping) {
      playSound('pump');
    } else {
      stopSound('pump');
    }
  }, [isPumping, playSound, stopSound]);

  const handlePumpStart = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    playSound('button');
    startPumping();
  };

  const handlePumpStop = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    stopPumping();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === ' ' || event.key === 'Enter') && !isPumping) {
      event.preventDefault();
      playSound('button');
      startPumping();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === ' ' || event.key === 'Enter') && isPumping) {
      event.preventDefault();
      stopPumping();
    }
  };

  return (
    <section className="grid w-full min-w-0 items-center gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,1.1fr)]">
      <div className="scene-panel order-2 w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[8px] p-4 lg:order-1 lg:max-w-none">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setGameScene('start')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white transition hover:bg-neutral-800"
            aria-label="Back to main menu"
            title="Back to main menu"
            type="button"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          {gameState.mode === 'multi' ? (
            <div className="min-w-0 rounded-full bg-[#087f5b] px-4 py-2 text-right text-sm font-black text-white">
              <span className="block truncate">{gameState.players[gameState.currentPlayer]?.name || 'Player'}</span>
              <span className="block text-xs text-white/75">Round {gameState.currentRound}/{gameState.roundsPerPlayer}</span>
            </div>
          ) : (
            <div className="rounded-full bg-[#087f5b] px-4 py-2 text-sm font-black text-white">
              Solo Run
            </div>
          )}
        </div>

        <div className="rounded-[8px] border border-dashed border-neutral-400/70 bg-[#fffdf4] p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-dashed border-neutral-300 pb-3">
            <div>
              <div className="text-xs font-black uppercase text-neutral-500">Pump order</div>
              <div className="mt-1 text-sm font-bold text-neutral-700">Stop as close as possible</div>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-black uppercase ${isInPerfectZone ? 'bg-[#087f5b] text-white' : isOverTarget ? 'bg-[#d92d20] text-white' : 'bg-neutral-900 text-white'}`}>
              {statusLabel}
            </div>
          </div>

          <div className="grid gap-3">
            <div>
              <div className="text-xs font-black uppercase text-neutral-500">Target amount</div>
              <div className="mt-1 text-5xl font-black leading-none">{formatCurrency(targetAmount)}</div>
            </div>

            <div className="grid gap-3">
              <div className="control-surface rounded-[8px] p-3">
                <div className="text-xs font-black uppercase text-neutral-500">Now showing</div>
                <div className={`mt-1 text-3xl font-black ${isOverTarget ? 'text-[#d92d20]' : 'text-neutral-950'}`}>
                  {formatCurrency(currentAmount)}
                </div>
              </div>
            </div>

            <div className="rounded-[8px] bg-neutral-950 p-3 text-white">
              <div className="flex items-center justify-between gap-3 text-xs font-black uppercase text-white/60">
                <span>Panel lights</span>
                <span>{isPumping ? 'Fuel flowing' : 'No flow'}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ['Power', true],
                  ['Flow', isPumping],
                  ['Exact', isInPerfectZone],
                ].map(([label, active]) => (
                  <div key={label as string} className="flex items-center gap-2 rounded-[6px] bg-white/8 px-2 py-2">
                    <span className={`h-3 w-3 rounded-full ${active ? 'bg-[#52ff9d] shadow-[0_0_10px_rgba(82,255,157,0.8)]' : 'bg-white/18'}`} />
                    <span className="text-[10px] font-black uppercase text-white/62">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 mt-8 min-w-0 lg:order-2 lg:mt-0">
        <div className="pump-cabinet relative mx-auto w-full max-w-[min(470px,calc(100vw-2rem))] rounded-[8px] border border-black/20 p-3 pt-7 sm:p-4 sm:pt-7">
          <div className="absolute -top-9 left-1/2 flex h-12 w-56 -translate-x-1/2 items-center justify-center rounded-t-[8px] bg-[#d92d20] text-base font-black uppercase text-white shadow-md">
            <span className="mr-2 h-4 w-4 rounded-full bg-[#f6c343]" />
            Fuel Shift
          </div>

          <div className="absolute -left-7 top-32 hidden h-36 w-12 rounded-l-[8px] bg-neutral-950 sm:block">
            <div className="mx-auto mt-4 h-20 w-4 rounded-full bg-white/14" />
          </div>
          <div className="nozzle-hose absolute -left-16 top-52 hidden h-44 w-28 sm:block" />
          <div className="absolute -left-24 top-36 hidden h-12 w-28 rotate-[-12deg] rounded-r-[16px] rounded-l-[6px] bg-neutral-900 shadow-lg sm:block">
            <div className="absolute left-3 top-3 h-6 w-10 rounded-sm bg-[#d92d20]" />
            <div className="absolute right-[-20px] top-5 h-3 w-10 rounded-full bg-neutral-950" />
          </div>

          <div className="mb-3 rounded-[6px] bg-neutral-900 p-2">
            <div className="flex items-center justify-between rounded-[4px] bg-[#f7f0de] px-3 py-2 text-[11px] font-black uppercase text-neutral-700">
              <span>Pump 02</span>
              <span>Self serve</span>
              <span>Pay at pump</span>
            </div>
          </div>

          <div className="meter-screen rounded-[8px] p-3 shadow-inner sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-2 text-xs font-black uppercase text-white/54">
              <span>Regular unleaded</span>
              <span>{isPumping ? 'Pumping' : 'Ready'}</span>
            </div>

            <div className="grid gap-2">
              {[
                ['Sale', formatCurrency(currentAmount)],
                ['Gallons', gallons.toFixed(3)],
                ['Price/Gal', formatCurrency(GAS_PRICE_PER_GALLON)],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-[6px] bg-white/8 px-3 py-1.5">
                  <div className="text-xs font-bold uppercase text-white/45">{label}</div>
                  <div className="led-display text-right text-3xl font-black">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[87, 89, 93].map((grade) => (
              <div key={grade} className="rounded-[8px] border border-black/10 bg-white/76 p-2 text-center shadow-sm">
                <div className="mx-auto mb-1 grid h-9 w-9 place-items-center rounded-full bg-[#f6c343] text-sm font-black shadow-inner">
                  {grade}
                </div>
                <div className="text-[10px] font-black uppercase text-neutral-500">Regular</div>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-[1fr_110px] gap-3">
            <div className="rounded-[8px] bg-neutral-950 p-3">
              <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase text-white/60">
                <span>Card reader</span>
                <span>Approved</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/16" />
              <div className="mt-3 h-4 rounded-sm bg-[#2f2f2f]" />
            </div>

            <div className="grid grid-cols-3 gap-1 rounded-[8px] bg-neutral-800 p-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(key => (
                <span key={key} className="grid h-7 place-items-center rounded-[4px] bg-neutral-950 text-xs font-black text-white/70">
                  {key}
                </span>
              ))}
            </div>
          </div>

          <button
            className={`primary-button mt-4 flex min-h-16 w-full touch-none items-center justify-center gap-3 rounded-[8px] px-5 text-xl font-black uppercase text-white ${
              isPumping ? 'bg-[#087f5b]' : 'bg-[#d92d20]'
            }`}
            onPointerDown={handlePumpStart}
            onPointerUp={handlePumpStop}
            onPointerCancel={handlePumpStop}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            aria-pressed={isPumping}
            type="button"
          >
            {isPumping ? <FireIcon className="h-6 w-6" /> : <BoltIcon className="h-6 w-6" />}
            {isPumping ? 'Release to stop' : 'Hold to pump'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GasPump;
