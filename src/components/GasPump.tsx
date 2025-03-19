import React, { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import nipplejs from 'nipplejs';

// Gas Pump 3D Model
const GasPumpModel = () => {
  const { gameState, startPumping, stopPumping } = useGame();
  const { isPumping } = gameState;
  
  // This would normally load a 3D model, but we'll create a simple one for now
  return (
    <group>
      {/* Gas pump base */}
      <mesh position={[0, -1, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 1.5]} />
        <meshStandardMaterial color="#ff6b35" />
      </mesh>
      
      {/* Gas pump body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.5, 3, 1]} />
        <meshStandardMaterial color="#2ec4b6" />
      </mesh>
      
      {/* Gas pump display */}
      <mesh position={[0, 1, 0.55]} castShadow>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#011627" />
      </mesh>
      
      {/* Gas pump nozzle holder */}
      <mesh position={[0.9, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#011627" />
      </mesh>
      
      {/* Gas pump hose */}
      <mesh position={[0.9, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Gas pump nozzle */}
      <mesh 
        position={[0.9, -0.5, 0]} 
        castShadow
        scale={isPumping ? 0.95 : 1}
      >
        <cylinderGeometry args={[0.1, 0.2, 0.5, 16]} />
        <meshStandardMaterial color={isPumping ? "#fdca40" : "#011627"} />
      </mesh>
    </group>
  );
};

// Main Gas Pump Component
const GasPump: React.FC = () => {
  const { gameState, startPumping, stopPumping } = useGame();
  const { isPumping, currentAmount, targetAmount, timeRemaining } = gameState;
  const joystickRef = useRef<HTMLDivElement>(null);
  const joystickInstance = useRef<any>(null);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  // Calculate how close to target
  const accuracy = currentAmount / targetAmount;
  const accuracyPercentage = Math.min(100, Math.round(accuracy * 100));
  
  // Handle touch controls
  useEffect(() => {
    if (joystickRef.current) {
      joystickInstance.current = nipplejs.create({
        zone: joystickRef.current,
        mode: 'static',
        position: { left: '50%', bottom: '80px' },
        color: 'rgba(255, 107, 53, 0.8)',
        size: 120
      });
      
      joystickInstance.current.on('start', () => {
        startPumping();
      });
      
      joystickInstance.current.on('end', () => {
        stopPumping();
      });
    }
    
    return () => {
      if (joystickInstance.current) {
        joystickInstance.current.destroy();
      }
    };
  }, [startPumping, stopPumping]);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      {/* Gas Pump Display */}
      <div className="bg-gradient-to-b from-[#011627] to-[#012a4a] p-4 rounded-lg shadow-lg w-full max-w-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-white accent-font">Target:</div>
          <div className="text-[#fdca40] text-2xl game-font">{formatCurrency(targetAmount)}</div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-white accent-font">Current:</div>
          <div className={`text-3xl game-font ${currentAmount > targetAmount ? 'text-red-500' : 'text-[#2ec4b6]'}`}>
            {formatCurrency(currentAmount)}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className={`h-4 rounded-full ${
              accuracyPercentage > 95 ? 'bg-green-500' : 
              accuracyPercentage > 80 ? 'bg-[#fdca40]' : 'bg-[#ff6b35]'
            }`}
            style={{ width: `${accuracyPercentage}%` }}
          />
        </div>
        
        {/* Timer */}
        <div className="flex justify-between items-center">
          <div className="text-white accent-font">Time:</div>
          <div className={`text-xl game-font ${timeRemaining <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {timeRemaining}s
          </div>
        </div>
      </div>
      
      {/* 3D Gas Pump */}
      <div className="gas-pump-container w-full h-64 mb-4">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <GasPumpModel />
          </PresentationControls>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Pump Controls */}
      <div className="flex flex-col items-center w-full">
        {/* Touch joystick area */}
        <div 
          ref={joystickRef} 
          className="relative w-full h-32 mb-4 flex items-center justify-center"
        >
          {!joystickInstance.current && (
            <div className="text-center text-gray-500 accent-font">
              <p>Touch and hold to pump</p>
              <p>Release to stop</p>
            </div>
          )}
        </div>
        
        {/* Alternative button controls */}
        <div className="flex space-x-4">
          <button
            className="pump-button bg-[#ff6b35] text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg active:shadow-none transition-all game-font"
            onTouchStart={startPumping}
            onTouchEnd={stopPumping}
            onMouseDown={startPumping}
            onMouseUp={stopPumping}
            onMouseLeave={() => isPumping && stopPumping()}
          >
            {isPumping ? 'PUMPING!' : 'PUMP GAS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasPump;
