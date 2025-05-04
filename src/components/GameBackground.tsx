import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GameScene } from '../types';

interface GameBackgroundProps {
  scene: GameScene;
}

const GameBackground: React.FC<GameBackgroundProps> = ({ scene }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    // Clear any existing elements
    while (backgroundRef.current.firstChild) {
      backgroundRef.current.removeChild(backgroundRef.current.firstChild);
    }
    
    // Create background elements based on scene
    switch (scene) {
      case 'start':
        createStartBackground();
        break;
      case 'game':
        createGameBackground();
        break;
      case 'success':
        createSuccessBackground();
        break;
      case 'fail':
        createFailBackground();
        break;
      case 'leaderboard':
        createLeaderboardBackground();
        break;
    }
  }, [scene]);
  
  // Create background for start scene
  const createStartBackground = () => {
    if (!backgroundRef.current) return;
    
    // Create clouds
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'absolute rounded-full bg-white opacity-30';
      cloud.style.width = `${Math.random() * 100 + 50}px`;
      cloud.style.height = `${Math.random() * 60 + 30}px`;
      cloud.style.top = `${Math.random() * 50}%`;
      cloud.style.left = `${Math.random() * 100}%`;
      backgroundRef.current.appendChild(cloud);
      
      // Animate cloud
      gsap.to(cloud, {
        x: '+=100',
        duration: Math.random() * 30 + 20,
        repeat: -1,
        ease: 'none'
      });
    }
    
    // Create road
    const road = document.createElement('div');
    road.className = 'absolute bottom-0 left-0 w-full h-[15vh] bg-[#333] opacity-20';
    backgroundRef.current.appendChild(road);
    
    // Create road markings
    for (let i = 0; i < 5; i++) {
      const marking = document.createElement('div');
      marking.className = 'absolute bg-white opacity-50';
      marking.style.width = '50px';
      marking.style.height = '8px';
      marking.style.bottom = '7vh';
      marking.style.left = `${i * 25}%`;
      backgroundRef.current.appendChild(marking);
      
      // Animate marking
      gsap.to(marking, {
        x: '+=100vw',
        duration: 10,
        repeat: -1,
        ease: 'none'
      });
    }
  };
  
  // Create background for game scene
  const createGameBackground = () => {
    if (!backgroundRef.current) return;
    
    // Create gas station building
    const building = document.createElement('div');
    building.className = 'absolute bg-[#2ec4b6] opacity-10 rounded-t-lg';
    building.style.width = '200px';
    building.style.height = '100px';
    building.style.bottom = '15vh';
    building.style.right = '10%';
    backgroundRef.current.appendChild(building);
    
    // Create gas station sign
    const sign = document.createElement('div');
    sign.className = 'absolute bg-[#ff6b35] opacity-20 rounded';
    sign.style.width = '80px';
    sign.style.height = '60px';
    sign.style.bottom = '25vh';
    sign.style.right = '15%';
    backgroundRef.current.appendChild(sign);
    
    // Create road
    const road = document.createElement('div');
    road.className = 'absolute bottom-0 left-0 w-full h-[15vh] bg-[#333] opacity-10';
    backgroundRef.current.appendChild(road);
    
    // Create random cars passing by
    const createCar = () => {
      const car = document.createElement('div');
      car.className = 'absolute bg-opacity-20 rounded';
      car.style.width = '60px';
      car.style.height = '30px';
      car.style.bottom = '5vh';
      car.style.left = '-60px';
      
      // Random car color
      const colors = ['#ff6b35', '#2ec4b6', '#fdca40', '#011627'];
      car.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      backgroundRef.current?.appendChild(car);
      
      // Animate car
      gsap.to(car, {
        x: window.innerWidth + 100,
        duration: Math.random() * 5 + 5,
        ease: 'power1.inOut',
        onComplete: () => {
          if (backgroundRef.current?.contains(car)) {
            backgroundRef.current.removeChild(car);
          }
        }
      });
      
      // Schedule next car
      setTimeout(createCar, Math.random() * 5000 + 3000);
    };
    
    createCar();
  };
  
  // Create background for success scene
  const createSuccessBackground = () => {
    if (!backgroundRef.current) return;
    
    // Create confetti
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute rounded-sm';
      
      // Random confetti color
      const colors = ['#ff6b35', '#2ec4b6', '#fdca40', '#ffffff'];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.top = '-20px';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      backgroundRef.current.appendChild(confetti);
      
      // Animate confetti
      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: `+=${Math.random() * 360}`,
        duration: Math.random() * 3 + 2,
        ease: 'power1.inOut',
        delay: Math.random() * 2,
        onComplete: () => {
          if (backgroundRef.current?.contains(confetti)) {
            backgroundRef.current.removeChild(confetti);
          }
        }
      });
    }
    
    // Create success glow
    const glow = document.createElement('div');
    glow.className = 'absolute rounded-full bg-[#2ec4b6] opacity-10';
    glow.style.width = '300px';
    glow.style.height = '300px';
    glow.style.top = '50%';
    glow.style.left = '50%';
    glow.style.transform = 'translate(-50%, -50%)';
    backgroundRef.current.appendChild(glow);
    
    // Animate glow
    gsap.to(glow, {
      scale: 1.5,
      opacity: 0.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  };
  
  // Create background for fail scene
  const createFailBackground = () => {
    if (!backgroundRef.current) return;
    
    // Create gas splatter
    for (let i = 0; i < 15; i++) {
      const splatter = document.createElement('div');
      splatter.className = 'absolute rounded-full bg-[#ff6b35] opacity-20';
      splatter.style.width = `${Math.random() * 50 + 20}px`;
      splatter.style.height = `${Math.random() * 50 + 20}px`;
      splatter.style.top = `${Math.random() * 80}%`;
      splatter.style.left = `${Math.random() * 80}%`;
      backgroundRef.current.appendChild(splatter);
      
      // Animate splatter
      gsap.from(splatter, {
        scale: 0,
        duration: 0.5,
        delay: Math.random() * 0.5,
        ease: 'back.out'
      });
    }
    
    // Create sad cloud
    const cloud = document.createElement('div');
    cloud.className = 'absolute rounded-full bg-[#011627] opacity-10';
    cloud.style.width = '200px';
    cloud.style.height = '100px';
    cloud.style.top = '20%';
    cloud.style.left = '50%';
    cloud.style.transform = 'translateX(-50%)';
    backgroundRef.current.appendChild(cloud);
    
    // Animate cloud
    gsap.to(cloud, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  };
  
  // Create background for leaderboard scene
  const createLeaderboardBackground = () => {
    if (!backgroundRef.current) return;
    
    // Create trophy silhouettes
    for (let i = 0; i < 5; i++) {
      const trophy = document.createElement('div');
      trophy.className = 'absolute bg-[#fdca40] opacity-10';
      
      // Trophy cup shape
      const cup = document.createElement('div');
      cup.className = 'absolute rounded-full';
      cup.style.width = '30px';
      cup.style.height = '20px';
      cup.style.top = '0';
      cup.style.left = '5px';
      trophy.appendChild(cup);
      
      // Trophy stem
      const stem = document.createElement('div');
      stem.className = 'absolute';
      stem.style.width = '10px';
      stem.style.height = '25px';
      stem.style.top = '15px';
      stem.style.left = '15px';
      trophy.appendChild(stem);
      
      // Trophy base
      const base = document.createElement('div');
      base.className = 'absolute rounded';
      base.style.width = '30px';
      base.style.height = '5px';
      base.style.top = '35px';
      base.style.left = '5px';
      trophy.appendChild(base);
      
      trophy.style.width = '40px';
      trophy.style.height = '40px';
      trophy.style.top = `${Math.random() * 70 + 10}%`;
      trophy.style.left = `${Math.random() * 70 + 10}%`;
      trophy.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
      backgroundRef.current.appendChild(trophy);
      
      // Animate trophy
      gsap.to(trophy, {
        rotation: `+=${Math.random() * 10 - 5}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    
    // Create star particles
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'absolute bg-[#fdca40] opacity-20';
      star.style.width = '5px';
      star.style.height = '5px';
      star.style.borderRadius = '50%';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      backgroundRef.current.appendChild(star);
      
      // Animate star
      gsap.to(star, {
        scale: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  };
  
  return (
    <div 
      ref={backgroundRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default GameBackground;
