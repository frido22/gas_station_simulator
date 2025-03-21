import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useSounds } from '@/hooks/useSounds';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return amount.toFixed(2);
};

// Gas Pump Component
export const GasPump: React.FC = () => {
  const { gameState, startPumping, stopPumping } = useGame();
  const { isPumping, currentAmount, targetAmount } = gameState;
  const { playSound, stopSound } = useSounds();
  
  // Play pump sound when pumping
  useEffect(() => {
    if (isPumping) {
      playSound('pump');
    } else {
      stopSound('pump');
      
      // Play success or fail sound when stopping
      if (currentAmount > 0) {
        if (Math.abs(currentAmount - targetAmount) < 0.01) {
          playSound('success');
        } else if (currentAmount > targetAmount) {
          playSound('fail');
        }
      }
    }
  }, [isPumping, currentAmount, targetAmount, playSound, stopSound]);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Gas Pump Display */}
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-gray-700">
        {/* Gas Station Brand */}
        <div className="text-center mb-4">
          <div className="text-yellow-400 text-xl font-bold">PUMP PERFECTION</div>
          <div className="text-white text-xs tracking-wider">PREMIUM FUEL</div>
        </div>
        
        {/* 2D Gas Pump with Digital Display */}
        <div className="relative mb-4">
          {/* Gas Pump Frame */}
          <div className="bg-[#2ec4b6] rounded-lg p-6 pb-10 shadow-lg border-4 border-[#011627] relative h-[500px]">
            {/* Pump Top Section with Branding */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#2ec4b6] rounded-t-lg border-4 border-b-0 border-[#011627] flex items-center justify-center">
              <div className="text-[#011627] text-xs font-bold">PUMP PERFECT</div>
            </div>
            
            {/* Nozzle Holder (Left) */}
            <div className="absolute -left-6 top-1/3 w-6 h-16 bg-[#011627] rounded-l-lg"></div>
            
            {/* Nozzle */}
            <div className="absolute -left-20 top-1/3 w-14 h-8 bg-[#ff6b35] rounded-lg transform rotate-12">
              <div className="absolute top-1/2 right-0 w-10 h-3 bg-black rounded-full transform -translate-y-1/2"></div>
            </div>
            
            {/* Hose */}
            <div className="absolute -left-12 top-1/3 w-6 h-24 border-l-4 border-dashed border-black transform -rotate-12"></div>
            
            {/* Digital Display */}
            <div className="bg-black p-3 rounded-lg border-2 border-gray-700 mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-400 text-sm">TARGET:</div>
                <div className="font-mono bg-gray-900 px-2 py-1 rounded">
                  <span className="text-yellow-400 text-xl tracking-wider">
                    {formatCurrency(targetAmount)}
                  </span>
                </div>
              </div>
              
              {/* Current Amount - LED Display */}
              <div className="bg-gray-900 p-2 rounded mb-2 border border-gray-700">
                <div className="flex justify-between">
                  <div className="text-gray-400 text-xs">GALLONS</div>
                  <div className="text-gray-400 text-xs">PRICE</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-mono text-green-500 text-2xl tracking-widest led-display">
                    {(currentAmount / 3).toFixed(3)}
                  </div>
                  <div className="font-mono text-green-500 text-3xl tracking-widest font-bold led-display">
                    ${formatCurrency(currentAmount)}
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <div className="text-gray-400 text-xs">PRICE/GAL</div>
                  <div className="text-gray-400 text-xs font-mono">$3.000</div>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="flex justify-between text-xs">
                <div className={`${isPumping ? 'text-green-500' : 'text-gray-600'}`}>
                  {isPumping ? '● PUMPING' : '○ READY'}
                </div>
                <div className="text-gray-400">
                  REGULAR UNLEADED
                </div>
              </div>
            </div>
            
            {/* Control Panel - Removed number pad */}
            <div className="h-10 mb-2 flex items-center justify-center">
              <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
            </div>
            
            {/* Credit Card Reader */}
            <div className="bg-gray-900 h-8 rounded-md border border-gray-700 mb-2 flex items-center justify-center">
              <div className="w-3/4 h-1 bg-gray-700"></div>
            </div>
            
            {/* Side Decorations */}
            <div className="absolute -right-3 top-1/4 bottom-1/4 w-3 bg-[#ff6b35] rounded-r-lg"></div>
            
            {/* Pump Buttons */}
            <div className="flex justify-between mb-2">
              <div className="bg-[#ff6b35] rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold">87</div>
              <div className="bg-[#ff6b35] rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold">89</div>
              <div className="bg-[#ff6b35] rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold">93</div>
            </div>
            
            {/* Main Pump Button - Added inside the pump body */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center">
              <button
                className="pump-button bg-[#ff6b35] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg active:shadow-none transition-all game-font border-2 border-[#011627]"
                onMouseDown={() => {
                  playSound('button');
                  startPumping();
                }}
                onMouseUp={() => stopPumping()}
                onMouseLeave={() => isPumping && stopPumping()}
                onTouchStart={() => {
                  playSound('button');
                  startPumping();
                }}
                onTouchEnd={() => stopPumping()}
              >
                {isPumping ? 'PUMPING!' : 'PUMP GAS'}
              </button>
            </div>
            
            {/* Removed Brand Logo from bottom right */}
          </div>
        </div>
        
        {/* Instructions */}
        <div className="text-center text-gray-400 text-xs mb-1">
          {isPumping ? 'RELEASE TO STOP' : 'PRESS & HOLD TO PUMP'}
        </div>
      </div>
    </div>
  );
};

export default GasPump;
