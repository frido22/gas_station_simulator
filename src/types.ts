/**
 * Type definitions for the Pump Perfection gas station simulator game
 */

// Game scene types
export type GameScene = 'start' | 'game' | 'success' | 'fail' | 'leaderboard';

// Game state interface
export interface GameState {
  isPlaying: boolean;
  isPumping: boolean;
  targetAmount: number;
  currentAmount: number;
  score: number;
  highScore: number;
  gameOver: boolean;
  success: boolean;
  level: number;
}

// Player interface for leaderboard
export interface Player {
  name: string;
  score: number;
}

// Animation types
export type AnimationName = 'float' | 'pulse' | 'shake' | 'confetti';

// Sound types
export type SoundName = 'pump' | 'success' | 'fail' | 'button' | 'levelup' | 'splash';

// Game difficulty levels
export enum DifficultyLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Expert = 'expert'
}

// Funny titles for leaderboard rankings
export const LeaderboardTitles: Record<number, string> = {
  1: 'Pump Master Supreme',
  2: 'Gas Guru',
  3: 'Fuel Fanatic',
  4: 'Petrol Prodigy',
  5: 'Octane Overlord',
  6: 'Diesel Deity',
  7: 'Nozzle Ninja',
  8: 'Gallon Gladiator',
  9: 'Petroleum Pro',
  10: 'Tank Tactician',
};

// Funny messages for success/failure
export const SuccessMessages: string[] = [
  'Perfect pump! You\'re a gas-tastic genius!',
  'Wow! You\'ve got the precision of a surgeon... for gas!',
  'Pump-tastic! You\'re the Michelangelo of fuel dispensing!',
  'Holy unleaded! That was spot on!',
  'You\'ve got gas pumping in your veins! (Not literally, we hope)',
];

export const FailMessages: string[] = [
  'Oops! You just gave the gas station a free car wash!',
  'Too much! The tank is crying premium tears!',
  'Splash zone! Hope you brought a towel!',
  'That\'s one expensive puddle you just made!',
  'Congratulations! You just invented the gas fountain!',
];

// Game settings
export interface GameSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  difficulty: DifficultyLevel;
}

// Touch control types
export interface TouchPosition {
  x: number;
  y: number;
  force?: number;
}

// Game statistics
export interface GameStats {
  gamesPlayed: number;
  perfectPumps: number;
  totalGallons: number;
  highestLevel: number;
}
