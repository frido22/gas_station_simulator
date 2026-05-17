/**
 * Type definitions for the Gas Station Simulator gas station simulator game
 */

// Game scene types
export type GameScene =
  | 'start'
  | 'game'
  | 'success'
  | 'fail'
  | 'leaderboard'
  | 'multiplayerResult'
  | 'multiplayerSummary';

// Multiplayer participant interface
export interface MultiplayerPlayer {
  name: string;
  totalError: number; // Cumulative error across all rounds
}

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
  mode: 'single' | 'multi';
  players: MultiplayerPlayer[];
  targets: number[][];
  currentPlayer: number;
  currentRound: number;
  roundsPerPlayer: number;
  lastTurnResult?: { // Optional: Stores details of the last completed multiplayer turn
    playerName: string;
    targetAmount: number;
    amountPumped: number;
    error: number;
    roundPlayed: number;
  };
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

// Game sound interface
export interface GameSound {
  name: SoundName;
  path: string;
  volume?: number;
  loop?: boolean;
}

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
  'Clean stop. The meter landed inside the perfect zone.',
  'Excellent control. That release timing was right on the mark.',
  'Sharp finish. The pump crew would approve.',
  'Perfect delivery. No spill, no overrun, no drama.',
  'That was a precision fill from start to stop.',
];

export const FailMessages: string[] = [
  'Good attempt. Tighten the release timing and run it back.',
  'The meter got away this time. Watch the last dollar closely.',
  'Close calls count in practice, but the pump wants precision.',
  'Reset your timing and aim for a cleaner stop.',
  'You missed the window. The next run is still yours.',
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
