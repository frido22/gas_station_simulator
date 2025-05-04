import React from 'react';
import { useGame } from '@/context/GameContext';

const MultiplayerResult: React.FC = () => {
  const { gameState, setGameScene } = useGame();
  const { players, currentPlayer, currentRound, targets, currentAmount, roundsPerPlayer } = gameState;

  // Determine the player who JUST finished their turn
  const previousPlayerIndex = (currentPlayer + players.length - 1) % players.length;
  const previousPlayerName = players[previousPlayerIndex]?.name || 'Previous Player';

  // Determine the round they played (could be the previous round if currentPlayer just wrapped to 0)
  // Note: currentRound in gameState is already potentially updated for the *next* turn
  const roundPlayed = (currentPlayer === 0 && currentRound > 1) ? currentRound - 1 : currentRound;

  // Get the target for the turn that just finished
  const targetPlayed = targets[previousPlayerIndex]?.[roundPlayed - 1] ?? 0; // Added nullish coalescing for safety

  // Calculate the error for the turn that just finished
  const error = Math.abs(currentAmount - targetPlayed);

  // Determine the next player's name
  const nextPlayerName = players[currentPlayer]?.name || 'Next Player';

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-6 bg-white text-black">
      {/* Display results for the player who just finished */}
      <h2 className="text-3xl font-bold mb-4 game-font text-black">
        Results for {previousPlayerName}
      </h2>
      <p className="text-xl mb-2 text-black">Round: {roundPlayed} / {roundsPerPlayer}</p>
      <p className="text-xl mb-2 text-black">Target: ${targetPlayed.toFixed(2)}</p>
      <p className="text-xl mb-2 text-black">Pumped: ${currentAmount.toFixed(2)}</p>
      <p className="text-2xl mb-6 text-black font-bold">Error: {error.toFixed(2)}</p>

      {/* Next turn button clearly indicates next player */}
      <button
        onClick={() => setGameScene('game')}
        className="bg-primary text-black py-2 px-4 rounded-md font-bold game-font"
      >
        {/* gameState.currentPlayer is already updated to the *next* player */}
        Next Turn: {nextPlayerName}
      </button>
    </div>
  );
};

export default MultiplayerResult;
