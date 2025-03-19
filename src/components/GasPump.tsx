import React from 'react';
import { useGame } from '@/context/GameContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls } from '@react-three/drei';

// Gas Pump 3D Model
const GasPumpModel = () => {
  // More detailed gas pump model
  return (
    <group>
      {/* Gas pump base */}
      <mesh position={[0, -1.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 0.2, 1.5]} />
        <meshStandardMaterial color="#ff6b35" />
      </mesh>
      
      {/* Gas pump body */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.5, 3, 1]} />
        <meshStandardMaterial color="#2ec4b6" />
      </mesh>
      
      {/* Gas pump display frame */}
      <mesh position={[0, 0.5, 0.55]} receiveShadow castShadow>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#011627" />
      </mesh>
      
      {/* Gas pump display screen (will be overlaid with HTML) */}
      <mesh position={[0, 0.5, 0.56]} receiveShadow castShadow>
        <boxGeometry args={[1, 1, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Gas pump nozzle holder */}
      <mesh position={[0.9, -0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#011627" />
      </mesh>
      
      {/* Gas pump hose */}
      <mesh position={[0.9, 0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Gas pump nozzle */}
      <mesh position={[0.9, -1, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.1, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#011627" />
      </mesh>
      
      {/* Control panel */}
      <mesh position={[0, -0.7, 0.55]} receiveShadow castShadow>
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
};

// Gas Pump Scene
const GasPumpScene = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ height: '300px' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <pointLight position={[-10, -10, -10]} />
      
      <PresentationControls
        global
        rotation={[0, -0.2, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <GasPumpModel />
      </PresentationControls>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

// Main Gas Pump Component
const GasPump: React.FC = () => {
  const { gameState, startPumping, stopPumping } = useGame();
  const { isPumping, currentAmount, targetAmount } = gameState;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toFixed(2);
  };
  
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Gas Pump Display */}
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-gray-700">
        {/* Gas Station Brand */}
        <div className="text-center mb-4">
          <div className="text-yellow-400 text-sm font-bold">PUMP PERFECTION</div>
          <div className="text-white text-xs">PREMIUM FUEL</div>
        </div>
        
        {/* Integrated Gas Pump with Digital Display */}
        <div className="relative mb-4">
          {/* 3D Gas Pump */}
          <div className="h-[300px] bg-gray-700 rounded-lg overflow-hidden">
            <GasPumpScene />
          </div>
          
          {/* Digital Display - Positioned to look like part of the 3D model */}
          <div className="absolute top-[60px] left-0 right-0 mx-auto w-[80%] bg-black p-3 rounded border border-gray-700 shadow-lg">
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
        </div>
        
        {/* Instructions */}
        <div className="text-center text-gray-400 text-xs">
          {isPumping ? 'RELEASE TO STOP' : 'PRESS & HOLD TO PUMP'}
        </div>
      </div>
      
      {/* Pump Controls */}
      <div className="flex flex-col items-center w-full mt-6">
        {/* Button controls */}
        <div className="flex space-x-4">
          <button
            className="pump-button bg-[#ff6b35] text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg active:shadow-none transition-all game-font"
            onMouseDown={() => startPumping()}
            onMouseUp={() => stopPumping()}
            onMouseLeave={() => isPumping && stopPumping()}
            onTouchStart={() => startPumping()}
            onTouchEnd={() => stopPumping()}
          >
            {isPumping ? 'PUMPING!' : 'PUMP GAS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasPump;
