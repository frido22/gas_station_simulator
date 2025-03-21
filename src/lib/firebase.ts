// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Player } from '@/types';

// Your web app's Firebase configuration
// Replace these with your actual Firebase project details
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a player to the leaderboard
export const addPlayerToLeaderboard = async (player: Player): Promise<void> => {
  try {
    // Add timestamp to the player data
    const playerWithTimestamp = {
      ...player,
      timestamp: new Date()
    };
    
    await addDoc(collection(db, 'leaderboard'), playerWithTimestamp);
    console.log('Player added to leaderboard');
  } catch (error) {
    console.error('Error adding player to leaderboard:', error);
  }
};

// Get the top players from the leaderboard
export const getLeaderboard = async (limitCount: number = 10): Promise<Player[]> => {
  try {
    const leaderboardQuery = query(
      collection(db, 'leaderboard'),
      orderBy('score', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(leaderboardQuery);
    const leaderboard: Player[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        name: data.name,
        score: data.score
      });
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};
