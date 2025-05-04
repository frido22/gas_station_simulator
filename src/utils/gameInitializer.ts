/**
 * Game Initializer
 * Handles initial setup tasks for the Gas Station Simulator game
 */

// Check if we're in the browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize the game
export const initializeGame = () => {
  if (!isBrowser) return;
  
  // Set up viewport height for mobile
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // Call once on init
  setVh();
  
  // Add event listeners for resize and orientation change
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
  
  // Prevent pinch zoom on mobile
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // Prevent context menu on long press
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', setVh);
    window.removeEventListener('orientationchange', setVh);
  };
};

// Preload assets function
export const preloadAssets = () => {
  if (!isBrowser) return;
  
  // List of image assets to preload
  const imageAssets: string[] = [
    // Add image paths here when available
    '/images/gas-pump.png',
    '/images/background.png',
  ];
  
  // Preload images
  imageAssets.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Handle device detection
export const getDeviceType = () => {
  if (!isBrowser) return 'server';
  
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Check if device supports touch
export const isTouchDevice = () => {
  if (!isBrowser) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
