import React, { useEffect } from 'react';
import { ArrowLeftIcon, BoltIcon, FireIcon } from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';
import {
  formatCurrency,
  GAS_PRICE_PER_GALLON,
  getPrecisionLabel,
  getPumpError,
  getTargetProgress,
  isPerfectStop,
} from '@/utils/gameRules';

export const GasPump: React.FC = () => {
  const { gameState, startPumping, stopPumping, setGameScene } = useGame();
  const { isPumping, currentAmount, targetAmount } = gameState;
  const { playSound, stopSound } = useSounds();
  const progress = getTargetProgress(currentAmount, targetAmount);
  const clampedProgress = Math.min(progress, 100);
  const pumpError = getPumpError(currentAmount, targetAmount);
  const statusLabel = getPrecisionLabel(currentAmount, targetAmount);
  const gallons = currentAmount / GAS_PRICE_PER_GALLON;
  const isInPerfectZone = isPerfectStop(currentAmount, targetAmount);

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
    <section className="grid w-full items-center gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,1.1fr)]">
      <div className="scene-panel order-2 rounded-[8px] p-4 lg:order-1">
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="control-surface rounded-[8px] p-4">
            <div className="text-xs font-black uppercase text-neutral-500">Target</div>
            <div className="mt-1 text-4xl font-black leading-none">{formatCurrency(targetAmount)}</div>
          </div>

          <div className="control-surface rounded-[8px] p-4">
            <div className="text-xs font-black uppercase text-neutral-500">Current</div>
            <div className={`mt-1 text-4xl font-black leading-none ${currentAmount > targetAmount ? 'text-[#d92d20]' : 'text-neutral-950'}`}>
              {formatCurrency(currentAmount)}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[8px] bg-neutral-950 p-4 text-white">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm font-black">{statusLabel}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${isInPerfectZone ? 'bg-[#52ff9d] text-neutral-950' : 'bg-white/12 text-white'}`}>
              {pumpError.toFixed(2)} off
            </span>
          </div>

          <div className="relative h-4 overflow-hidden rounded-full bg-white/14">
            <div className="proximity-track absolute inset-y-0 left-0 rounded-full" style={{ width: `${clampedProgress}%` }} />
            <div className="absolute inset-y-[-4px] left-[calc(100%-3px)] w-[6px] rounded-full bg-white shadow" />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold text-white/70">
            <span>Start</span>
            <span>Perfect</span>
            <span>Overflow</span>
          </div>
        </div>
      </div>

      <div className="order-1 mt-8 lg:order-2 lg:mt-0">
        <div className="pump-cabinet relative mx-auto w-full max-w-[430px] rounded-[8px] border border-black/20 p-4 pt-7">
          <div className="absolute -top-8 left-1/2 flex h-10 w-48 -translate-x-1/2 items-center justify-center rounded-t-[8px] bg-[#d92d20] text-sm font-black uppercase text-white shadow-md">
            Fuel Shift
          </div>

          <div className="absolute -left-7 top-28 hidden h-32 w-12 rounded-l-[8px] bg-neutral-950 sm:block" />
          <div className="nozzle-hose absolute -left-14 top-48 hidden h-40 w-24 sm:block" />
          <div className="absolute -left-20 top-32 hidden h-11 w-24 rotate-[-10deg] rounded-[8px] bg-[#d92d20] shadow-lg sm:block">
            <div className="absolute right-[-18px] top-4 h-3 w-9 rounded-full bg-neutral-950" />
          </div>

          <div className="meter-screen rounded-[8px] p-4">
            <div className="mb-3 flex items-center justify-between gap-3 text-xs font-black uppercase text-white/54">
              <span>Regular unleaded</span>
              <span>{isPumping ? 'Pumping' : 'Ready'}</span>
            </div>

            <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
              <div className="rounded-[6px] bg-white/8 p-3">
                <div className="text-xs font-bold uppercase text-white/45">Gallons</div>
                <div className="led-display mt-2 text-2xl font-black">{gallons.toFixed(3)}</div>
              </div>
              <div className="rounded-[6px] bg-white/8 p-3 text-right">
                <div className="text-xs font-bold uppercase text-white/45">Sale</div>
                <div className="led-display mt-2 text-4xl font-black">{formatCurrency(currentAmount)}</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-bold text-white/54">
              <span>Price/Gal {formatCurrency(GAS_PRICE_PER_GALLON)}</span>
              <span className="text-right">Goal {formatCurrency(targetAmount)}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[87, 89, 93].map((grade) => (
              <div key={grade} className="rounded-[8px] border border-black/10 bg-white/70 p-3 text-center shadow-sm">
                <div className="mx-auto mb-1 grid h-8 w-8 place-items-center rounded-full bg-[#f6c343] text-xs font-black">
                  {grade}
                </div>
                <div className="text-[10px] font-black uppercase text-neutral-500">Octane</div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[8px] bg-neutral-950 p-3">
            <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase text-white/60">
              <span>Card reader</span>
              <span>Approved</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/16" />
          </div>

          <button
            className={`primary-button mt-5 flex min-h-20 w-full touch-none items-center justify-center gap-3 rounded-[8px] px-5 text-xl font-black uppercase text-white ${
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
