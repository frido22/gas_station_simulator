export interface GameState {
  isPlaying: boolean;
  isPumping: boolean;
  targetAmount: number;
  currentAmount: number;
  timeRemaining: number;
  score: number;
  highScore: number;
  gameOver: boolean;
  success: boolean;
  level: number;
}

export interface Player {
  name: string;
  score: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
  title: string;
}

export type GameSound = 
  | 'pump'
  | 'success'
  | 'fail'
  | 'button'
  | 'levelUp'
  | 'countdown'
  | 'splash';

export interface GameSounds {
  [key: string]: HTMLAudioElement;
}

export type GameScene = 
  | 'start'
  | 'game'
  | 'success'
  | 'fail'
  | 'leaderboard';
