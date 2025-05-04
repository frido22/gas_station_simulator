import React from 'react';
import { useGame } from '@/context/GameContext';

const MultiplayerResult: React.FC = () => {
  const { gameState, setGameScene } = useGame();
  const { players, currentPlayer, roundsPerPlayer, lastTurnResult } = gameState;

  // Ensure lastTurnResult exists before accessing its properties
  if (!lastTurnResult) {
    // Handle the case where there's no result yet (e.g., show loading or error)
    // This shouldn't happen in the normal flow but is good for robustness.
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center p-6 bg-white text-black">
        <p>Waiting for results...</p>
      </div>
    );
  }

  // Extract results from the stored last turn data
  const { playerName, targetAmount, amountPumped, error, roundPlayed } = lastTurnResult;

  // Determine the next player's name (gameState.currentPlayer is already updated)
  const nextPlayerName = players[currentPlayer]?.name || 'Next Player';

  return (
    <div className="flex flex-col items-center justify-start w-full text-center p-6 pt-12 bg-white/80 backdrop-blur-sm text-black rounded-lg"> 
      {/* Display results for the player who just finished */}
      <h2 className="text-3xl font-bold mb-4 game-font text-black">
        Results for {playerName}
      </h2>
      <p className="text-xl mb-2 text-black">Round: {roundPlayed} / {roundsPerPlayer}</p>
      <p className="text-xl mb-2 text-black">Target: ${targetAmount.toFixed(2)}</p>
      <p className="text-xl mb-2 text-black">Pumped: ${amountPumped.toFixed(2)}</p>
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
