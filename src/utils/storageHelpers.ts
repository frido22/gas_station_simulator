/**
 * Storage Helper Utilities
 * Handles saving and retrieving game data from local storage
 */

import { Player, GameSettings, GameStats, DifficultyLevel } from '@/types';

// Storage keys
const STORAGE_KEYS = {
  LEADERBOARD: 'pumpPerfection_leaderboard',
  HIGH_SCORE: 'pumpPerfection_highScore',
  SETTINGS: 'pumpPerfection_settings',
  STATS: 'pumpPerfection_stats',
  MUTED: 'pumpPerfection_muted',
  LAST_LEVEL: 'pumpPerfection_lastLevel'
};

// Default settings
const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  vibrationEnabled: true,
  difficulty: DifficultyLevel.Easy
};

// Default stats
const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  perfectPumps: 0,
  totalGallons: 0,
  highestLevel: 1
};

/**
 * Save leaderboard to local storage
 */
export const saveLeaderboard = (leaderboard: Player[]): void => {
  try {
    // Sort by score (highest first) and limit to top 10
    const sortedLeaderboard = [...leaderboard]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(sortedLeaderboard));
  } catch (error) {
    console.error('Error saving leaderboard:', error);
  }
};

/**
 * Get leaderboard from local storage
 */
export const getLeaderboard = (): Player[] => {
  try {
    const leaderboardData = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    return leaderboardData ? JSON.parse(leaderboardData) : [];
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};

/**
 * Save high score to local storage
 */
export const saveHighScore = (score: number): void => {
  try {
    const currentHighScore = getHighScore();
    if (score > currentHighScore) {
      localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
    }
  } catch (error) {
    console.error('Error saving high score:', error);
  }
};

/**
 * Get high score from local storage
 */
export const getHighScore = (): number => {
  try {
    const highScore = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
    return highScore ? parseInt(highScore, 10) : 0;
  } catch (error) {
    console.error('Error getting high score:', error);
    return 0;
  }
};

/**
 * Save game settings to local storage
 */
export const saveSettings = (settings: Partial<GameSettings>): void => {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

/**
 * Get game settings from local storage
 */
export const getSettings = (): GameSettings => {
  try {
    const settingsData = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settingsData ? JSON.parse(settingsData) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error getting settings:', error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Update game stats
 */
export const updateStats = (updates: Partial<GameStats>): void => {
  try {
    const currentStats = getStats();
    const updatedStats = { ...currentStats, ...updates };
    
    // Update highest level if needed
    if (updates.highestLevel && updates.highestLevel > currentStats.highestLevel) {
      updatedStats.highestLevel = updates.highestLevel;
    }
    
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};

/**
 * Get game stats from local storage
 */
export const getStats = (): GameStats => {
  try {
    const statsData = localStorage.getItem(STORAGE_KEYS.STATS);
    return statsData ? JSON.parse(statsData) : DEFAULT_STATS;
  } catch (error) {
    console.error('Error getting stats:', error);
    return DEFAULT_STATS;
  }
};

/**
 * Save mute state to local storage
 */
export const saveMuteState = (muted: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.MUTED, muted.toString());
  } catch (error) {
    console.error('Error saving mute state:', error);
  }
};

/**
 * Get mute state from local storage
 */
export const getMuteState = (): boolean => {
  try {
    const muted = localStorage.getItem(STORAGE_KEYS.MUTED);
    return muted === 'true';
  } catch (error) {
    console.error('Error getting mute state:', error);
    return false;
  }
};

/**
 * Save last played level to local storage
 */
export const saveLastLevel = (level: number): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_LEVEL, level.toString());
  } catch (error) {
    console.error('Error saving last level:', error);
  }
};

/**
 * Get last played level from local storage
 */
export const getLastLevel = (): number => {
  try {
    const level = localStorage.getItem(STORAGE_KEYS.LAST_LEVEL);
    return level ? parseInt(level, 10) : 1;
  } catch (error) {
    console.error('Error getting last level:', error);
    return 1;
  }
};

/**
 * Clear all game data from local storage
 */
export const clearAllGameData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing game data:', error);
  }
};
