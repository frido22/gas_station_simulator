import React from 'react';
import { GameScene } from '../types';

interface GameBackgroundProps {
  scene: GameScene;
}

const clouds = [
  { top: '10%', width: '150px', left: '-18%', opacity: '0.56' },
  { top: '18%', width: '220px', left: '-45%', opacity: '0.42' },
  { top: '7%', width: '110px', left: '-70%', opacity: '0.46' },
];

const confetti = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 11) % 100}%`,
  width: index % 3 === 0 ? '8px' : '6px',
  height: index % 2 === 0 ? '14px' : '10px',
  background: ['#d92d20', '#087f5b', '#f6c343', '#ffffff'][index % 4],
  animationDelay: `${-(index % 9) * 0.22}s`,
}));

const GameBackground: React.FC<GameBackgroundProps> = ({ scene }) => {
  const isResultScene = scene === 'success' || scene === 'fail' || scene === 'multiplayerSummary';

  return (
    <div className="forecourt-bg pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {clouds.map((cloud, index) => (
        <div
          key={index}
          className="forecourt-cloud absolute h-12 rounded-full bg-white"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            opacity: cloud.opacity,
            animationDelay: `${index * -7}s`,
          }}
        >
          <span className="absolute -top-5 left-8 h-14 w-20 rounded-full bg-white" />
          <span className="absolute -top-3 right-8 h-12 w-16 rounded-full bg-white" />
        </div>
      ))}

      <div className="absolute bottom-[28%] left-[6%] hidden h-20 w-44 rounded-t-md bg-white/35 md:block" />
      <div className="absolute bottom-[28%] left-[8%] hidden h-10 w-10 bg-[#d92d20]/70 md:block" />
      <div className="absolute bottom-[28%] left-[13%] hidden h-10 w-10 bg-[#f6c343]/75 md:block" />

      <div className="station-canopy absolute bottom-[44%] left-1/2 h-10 w-[86vw] max-w-5xl -translate-x-1/2 rounded-b-md bg-[#d92d20]">
        <div className="absolute left-0 right-0 top-0 h-3 bg-[#f6c343]" />
        <div className="absolute left-[13%] top-10 h-36 w-5 bg-[#f7f0de]" />
        <div className="absolute right-[13%] top-10 h-36 w-5 bg-[#f7f0de]" />
      </div>

      <div className="absolute bottom-[30%] left-1/2 h-16 w-44 -translate-x-1/2 rounded-t-lg bg-[#fff7e8]/60 shadow-md">
        <div className="mx-auto mt-3 h-5 w-28 rounded-sm bg-[#087f5b]/80" />
      </div>

      <div className="forecourt-car absolute bottom-[10%] h-8 w-24 rounded-md bg-[#087f5b] shadow-md">
        <div className="absolute -top-4 left-5 h-5 w-12 rounded-t-md bg-[#fff7e8]" />
        <div className="absolute -bottom-2 left-3 h-4 w-4 rounded-full bg-neutral-900" />
        <div className="absolute -bottom-2 right-3 h-4 w-4 rounded-full bg-neutral-900" />
      </div>

      <div className="forecourt-car forecourt-car--two absolute bottom-[17%] h-7 w-20 rounded-md bg-[#d92d20] shadow-md">
        <div className="absolute -top-3 left-4 h-4 w-10 rounded-t-md bg-[#fff7e8]" />
        <div className="absolute -bottom-2 left-3 h-4 w-4 rounded-full bg-neutral-900" />
        <div className="absolute -bottom-2 right-3 h-4 w-4 rounded-full bg-neutral-900" />
      </div>

      <div className="absolute bottom-[20%] left-0 h-2 w-full bg-white/65" />
      <div className="absolute bottom-[8%] left-0 flex w-full justify-around">
        {[0, 1, 2, 3, 4].map((mark) => (
          <span key={mark} className="h-2 w-16 rounded-full bg-[#f6c343]" />
        ))}
      </div>

      {scene === 'fail' && (
        <div className="absolute inset-x-0 top-0 h-full bg-[#d92d20]/10" />
      )}

      {isResultScene && scene !== 'fail' && (
        <div className="absolute inset-0 bg-white/20" />
      )}

      {scene === 'success' && (
        <div className="absolute inset-0">
          {confetti.map((piece, index) => (
            <span
              key={index}
              className="confetti-piece absolute top-0 rounded-sm"
              style={piece}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBackground;
