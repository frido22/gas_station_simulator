import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGameAnimations = () => {
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  
  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      animationsRef.current.forEach(timeline => {
        if (timeline.isActive()) {
          timeline.kill();
        }
      });
    };
  }, []);
  
  // Animate gas pump
  const animatePump = (element: HTMLElement | null, isPumping: boolean) => {
    if (!element) return;
    
    const timeline = gsap.timeline();
    
    if (isPumping) {
      timeline.to(element, {
        y: 2,
        x: gsap.utils.random(-1, 1),
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    } else {
      timeline.to(element, {
        y: 0,
        x: 0,
        duration: 0.2,
        ease: 'power1.out'
      });
    }
    
    animationsRef.current.push(timeline);
    return timeline;
  };
  
  // Animate gas flow
  const animateGasFlow = (element: HTMLElement | null, isFlowing: boolean) => {
    if (!element) return;
    
    const timeline = gsap.timeline();
    
    if (isFlowing) {
      timeline.to(element, {
        height: '100%',
        duration: 0.5,
        ease: 'power1.inOut'
      });
    } else {
      timeline.to(element, {
        height: '0%',
        duration: 0.3,
        ease: 'power1.out'
      });
    }
    
    animationsRef.current.push(timeline);
    return timeline;
  };
  
  // Animate success
  const animateSuccess = (element: HTMLElement | null) => {
    if (!element) return;
    
    const timeline = gsap.timeline();
    
    timeline
      .from(element, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      .to(element, {
        y: -10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    
    animationsRef.current.push(timeline);
    return timeline;
  };
  
  // Animate failure
  const animateFailure = (element: HTMLElement | null) => {
    if (!element) return;
    
    const timeline = gsap.timeline();
    
    timeline
      .from(element, {
        scale: 1.2,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      })
      .to(element, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut'
      });
    
    animationsRef.current.push(timeline);
    return timeline;
  };
  
  // Animate button press
  const animateButtonPress = (element: HTMLElement | null) => {
    if (!element) return;
    
    const timeline = gsap.timeline();
    
    timeline
      .to(element, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power1.inOut'
      })
      .to(element, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(1.5)'
      });
    
    animationsRef.current.push(timeline);
    return timeline;
  };
  
  // Animate splash
  const animateSplash = (container: HTMLElement | null) => {
    if (!container) return;
    
    const timeline = gsap.timeline();
    
    // Create splash elements
    for (let i = 0; i < 20; i++) {
      const splash = document.createElement('div');
      splash.className = 'absolute bg-[#ff6b35] rounded-full';
      splash.style.width = `${Math.random() * 20 + 5}px`;
      splash.style.height = `${Math.random() * 20 + 5}px`;
      splash.style.opacity = '0.7';
      container.appendChild(splash);
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const startX = 0;
      const startY = 0;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      timeline.fromTo(
        splash,
        {
          x: startX,
          y: startY,
          opacity: 0.7,
          scale: 0
        },
        {
          x: endX,
          y: endY,
          opacity: 0,
          scale: 1,
          duration: Math.random() * 0.5 + 0.5,
          ease: 'power1.out',
          onComplete: () => {
            if (container.contains(splash)) {
              container.removeChild(splash);
            }
          }
        },
        0
      );
    }
    
    animationsRef.current.push(timeline);
    return timeline;
  };
  
  return {
    animatePump,
    animateGasFlow,
    animateSuccess,
    animateFailure,
    animateButtonPress,
    animateSplash
  };
};
