import React from 'react';
import { useGame } from '@/context/GameContext';

const MultiplayerSummary: React.FC = () => {
  const { gameState, resetGame } = useGame();
  const sortedPlayers = [...gameState.players].sort((a, b) => a.totalError - b.totalError);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full text-center p-6 pt-12 bg-white/80 backdrop-blur-sm text-black rounded-lg">
      <h2 className="text-3xl font-bold mb-4 game-font text-black">Match Summary</h2>
      <h3 className="text-2xl mb-4 text-black font-bold">
        Winner: {sortedPlayers[0]?.name || 'N/A'} with lowest error!
      </h3>
      <ul className="text-left mb-6 text-black text-lg">
        <li className="font-bold mb-1">Final Scores (Lowest Error Wins):</li>
        {sortedPlayers.map((player, index) => (
          <li key={index} className="mb-1">
            {index + 1}. {player.name}: Total Error = {player.totalError.toFixed(2)}
          </li>
        ))}
      </ul>
      <button
        onClick={resetGame}
        className="bg-primary text-black py-2 px-4 rounded-md game-font font-bold"
      >
        Play Again
      </button>
    </div>
  );
};

export default MultiplayerSummary;
