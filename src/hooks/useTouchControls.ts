import { useEffect, useRef } from 'react';
import nipplejs, { JoystickManager, JoystickOutputData } from 'nipplejs';

interface TouchControlsOptions {
  zone: HTMLElement | null;
  mode?: 'static' | 'semi' | 'dynamic';
  position?: { top?: string; left?: string; bottom?: string; right?: string };
  color?: string;
  size?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onMove?: (data: JoystickOutputData) => void;
}

export const useTouchControls = ({
  zone,
  mode = 'static',
  position = { bottom: '80px', left: '50%' },
  color = 'rgba(255, 107, 53, 0.8)',
  size = 120,
  onStart,
  onEnd,
  onMove
}: TouchControlsOptions) => {
  const joystickRef = useRef<JoystickManager | null>(null);
  
  useEffect(() => {
    if (!zone) return;
    
    // Create joystick
    joystickRef.current = nipplejs.create({
      zone,
      mode,
      position,
      color,
      size,
      dynamicPage: true,
    });
    
    // Set up event listeners
    if (onStart) {
      joystickRef.current.on('start', onStart);
    }
    
    if (onEnd) {
      joystickRef.current.on('end', onEnd);
    }
    
    if (onMove) {
      joystickRef.current.on('move', (_, data) => {
        onMove(data);
      });
    }
    
    // Clean up
    return () => {
      if (joystickRef.current) {
        joystickRef.current.destroy();
        joystickRef.current = null;
      }
    };
  }, [zone, mode, position, color, size, onStart, onEnd, onMove]);
  
  // Return joystick instance for external control if needed
  return joystickRef.current;
};

// Alternative button-based touch controls for simpler interactions
export const useButtonTouchControls = (
  element: HTMLElement | null,
  onStart?: () => void,
  onEnd?: () => void
) => {
  useEffect(() => {
    if (!element) return;
    
    const handleTouchStart = () => {
      onStart?.();
    };
    
    const handleTouchEnd = () => {
      onEnd?.();
    };
    
    const handleMouseDown = () => {
      onStart?.();
    };
    
    const handleMouseUp = () => {
      onEnd?.();
    };
    
    const handleMouseLeave = () => {
      onEnd?.();
    };
    
    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [element, onStart, onEnd]);
};
