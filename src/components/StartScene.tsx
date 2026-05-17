import React, { useState } from 'react';
import {
  MinusIcon,
  PlayIcon,
  PlusIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';
import { formatCurrency, PERFECT_TOLERANCE } from '@/utils/gameRules';

const MIN_TARGET = 5;
const MAX_TARGET = 100;

const clampTarget = (value: number) => Math.min(MAX_TARGET, Math.max(MIN_TARGET, value));
const resizePlayerNames = (names: string[], count: number) => {
  const nextNames = [...names];

  if (count > nextNames.length) {
    for (let i = nextNames.length; i < count; i++) {
      nextNames.push(`Player ${i + 1}`);
    }
  }

  return nextNames.slice(0, count);
};

const StartScene: React.FC = () => {
  const { startGame, gameState, setTargetAmount } = useGame();
  const { playSound } = useSounds();
  const [targetValue, setTargetValue] = useState(Math.max(MIN_TARGET, gameState.targetAmount || MIN_TARGET));
  const [mode, setMode] = useState<'single' | 'multi'>('single');
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array.from({ length: 2 }, (_, i) => `Player ${i + 1}`)
  );

  const updateTarget = (value: number) => {
    const clampedValue = clampTarget(Math.round(value / 5) * 5);
    setTargetValue(clampedValue);
    setTargetAmount(clampedValue);
  };

  const handleStartGame = () => {
    playSound('button');
    if (mode === 'multi') {
      const names = playerNames.map((name, index) => name.trim() || `Player ${index + 1}`);
      startGame(names);
    } else {
      startGame();
    }
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!Number.isNaN(value)) {
      updateTarget(value);
    }
  };

  const adjustTarget = (amount: number) => {
    updateTarget(targetValue + amount * 5);
    playSound('button');
  };

  const adjustPlayers = (amount: number) => {
    const nextPlayerCount = Math.min(6, Math.max(2, numPlayers + amount));
    setNumPlayers(nextPlayerCount);
    setPlayerNames(prev => resizePlayerNames(prev, nextPlayerCount));
    playSound('button');
  };

  return (
    <section className="grid w-full min-w-0 items-center gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="scene-panel w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[8px] p-5 sm:p-7 lg:max-w-none">
        <div className="mb-5 inline-flex items-center rounded-full bg-[#d92d20] px-3 py-1 text-xs font-black uppercase text-white shadow-sm">
          Precision pump challenge
        </div>

        <h1 className="max-w-xl text-3xl font-black leading-none text-neutral-950 sm:text-6xl">
          Nail the meter before it runs past the target.
        </h1>

        <p className="mt-4 max-w-lg text-base font-semibold text-neutral-700 sm:text-lg">
          Pick a dollar goal, hold the pump, and release inside the {formatCurrency(PERFECT_TOLERANCE)} perfect zone.
        </p>

        <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
          <div className="control-surface rounded-[8px] p-3">
            <div className="text-xs font-bold uppercase text-neutral-500">Target</div>
            <div className="mt-1 text-2xl font-black">{formatCurrency(targetValue)}</div>
          </div>
          <div className="control-surface rounded-[8px] p-3">
            <div className="text-xs font-bold uppercase text-neutral-500">Mode</div>
            <div className="mt-1 text-2xl font-black">{mode === 'single' ? 'Solo' : 'Party'}</div>
          </div>
          <div className="control-surface rounded-[8px] p-3">
            <div className="text-xs font-bold uppercase text-neutral-500">Best</div>
            <div className="mt-1 text-2xl font-black">{gameState.highScore ? formatCurrency(gameState.highScore) : '--'}</div>
          </div>
        </div>
      </div>

      <div className="scene-panel w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[8px] p-4 sm:p-5 lg:max-w-none">
        <div className="grid grid-cols-2 gap-2 rounded-[8px] bg-neutral-900 p-1">
          <button
            onClick={() => {
              setMode('single');
              playSound('button');
            }}
            className={`mode-button flex min-h-11 items-center justify-center gap-2 rounded-[6px] px-3 text-sm font-black ${
              mode === 'single' ? 'bg-white text-neutral-950 shadow-sm' : 'text-white/78 hover:bg-white/10'
            }`}
            type="button"
          >
            <UserIcon className="h-4 w-4" />
            Solo
          </button>
          <button
            onClick={() => {
              setMode('multi');
              playSound('button');
            }}
            className={`mode-button flex min-h-11 items-center justify-center gap-2 rounded-[6px] px-3 text-sm font-black ${
              mode === 'multi' ? 'bg-white text-neutral-950 shadow-sm' : 'text-white/78 hover:bg-white/10'
            }`}
            type="button"
          >
            <UsersIcon className="h-4 w-4" />
            Multiplayer
          </button>
        </div>

        {mode === 'single' ? (
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="target-amount" className="text-sm font-black uppercase text-neutral-600">
                Target amount
              </label>
              <span className="rounded-full bg-[#087f5b]/12 px-3 py-1 text-xs font-black text-[#076348]">
                {MIN_TARGET}-{MAX_TARGET}
              </span>
            </div>

            <div className="flex items-stretch overflow-hidden rounded-[8px] border border-black/10 bg-white">
              <button
                className="flex w-14 items-center justify-center bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:bg-neutral-300"
                onClick={() => adjustTarget(-1)}
                disabled={targetValue <= MIN_TARGET}
                aria-label="Decrease target"
                type="button"
              >
                <MinusIcon className="h-5 w-5" />
              </button>

              <input
                id="target-amount"
                type="number"
                value={targetValue}
                onChange={handleTargetChange}
                className="h-16 min-w-0 flex-1 border-0 bg-white text-center text-3xl font-black text-neutral-950 outline-none"
                min={MIN_TARGET}
                max={MAX_TARGET}
                step={5}
              />

              <button
                className="flex w-14 items-center justify-center bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:bg-neutral-300"
                onClick={() => adjustTarget(1)}
                disabled={targetValue >= MAX_TARGET}
                aria-label="Increase target"
                type="button"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-black uppercase text-neutral-600">Players</span>
              <div className="flex overflow-hidden rounded-full border border-black/10 bg-white">
                <button
                  className="flex h-9 w-10 items-center justify-center transition hover:bg-neutral-100 disabled:text-neutral-300"
                  onClick={() => adjustPlayers(-1)}
                  disabled={numPlayers <= 2}
                  aria-label="Remove player"
                  type="button"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="grid h-9 w-10 place-items-center text-sm font-black">{numPlayers}</span>
                <button
                  className="flex h-9 w-10 items-center justify-center transition hover:bg-neutral-100 disabled:text-neutral-300"
                  onClick={() => adjustPlayers(1)}
                  disabled={numPlayers >= 6}
                  aria-label="Add player"
                  type="button"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid max-h-[34vh] gap-2 overflow-y-auto pr-1">
              {playerNames.map((name, i) => (
                <input
                  key={i}
                  type="text"
                  value={name}
                  onChange={e => {
                    const namesCopy = [...playerNames];
                    namesCopy[i] = e.target.value;
                    setPlayerNames(namesCopy);
                  }}
                  placeholder={`Player ${i + 1}`}
                  className="h-12 rounded-[8px] border border-black/10 bg-white px-3 text-base font-bold text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-[#087f5b]"
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleStartGame}
          className="primary-button mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-[8px] bg-[#d92d20] px-5 text-base font-black uppercase text-white"
          type="button"
        >
          <PlayIcon className="h-5 w-5" />
          {mode === 'single' ? 'Start Pumping' : 'Start Match'}
        </button>

        {gameState.highScore > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-neutral-700">
            <TrophyIcon className="h-4 w-4 text-[#f6c343]" />
            Highest perfect target: {formatCurrency(gameState.highScore)}
          </div>
        )}
      </div>
    </section>
  );
};

export default StartScene;
