/**
 * This utility creates placeholder sound files for development
 * In a production environment, these would be replaced with actual sound files
 */

import fs from 'fs';
import path from 'path';

// Define the sound files we need
const SOUND_FILES = [
  'pump.mp3',
  'success.mp3',
  'fail.mp3',
  'button.mp3',
  'levelup.mp3',
  'countdown.mp3',
  'splash.mp3'
];

// Create an empty MP3 file (1x1 pixel transparent GIF as placeholder)
// This is just a placeholder - in production, you would use real sound files
const EMPTY_MP3_BUFFER = Buffer.from(
  'SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAABAAADQgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAA5TEFNRTMuMTAwAZYAAAAAAAAAABSAJAJAQgAAgAAAA0L2YLQxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=',
  'base64'
);

export const createPlaceholderSounds = () => {
  const soundsDir = path.join(process.cwd(), 'public', 'sounds');
  
  // Create the sounds directory if it doesn't exist
  if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir, { recursive: true });
  }
  
  // Create placeholder sound files
  SOUND_FILES.forEach(filename => {
    const filePath = path.join(soundsDir, filename);
    
    // Only create if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, EMPTY_MP3_BUFFER);
      console.log(`Created placeholder sound file: ${filename}`);
    }
  });
  
  console.log('Placeholder sound files are ready!');
};

// This function can be called during development to ensure sound files exist
if (process.env.NODE_ENV === 'development') {
  createPlaceholderSounds();
}
