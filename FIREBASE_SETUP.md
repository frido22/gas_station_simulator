# Firebase Setup for Global Leaderboard

Follow these steps to set up Firebase for your Gas Station Simulator's global leaderboard:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "Gas Station Simulator")
4. Follow the prompts (you can disable Google Analytics if you want)
5. Click "Create project"

## Step 2: Create a Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (recommended)
4. Select a location closest to your users (e.g., "us-central")
5. Click "Enable"

## Step 3: Set Up Authentication (Optional but Recommended)

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the "Anonymous" sign-in method (simplest for games)

## Step 4: Register Your Web App

1. In your Firebase project, click the gear icon next to "Project Overview" and select "Project settings"
2. Scroll down to "Your apps" and click the web icon (</>) 
3. Register your app with a nickname (e.g., "Gas Station Simulator Web")
4. Click "Register app"
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 5: Update Your Code

1. Open `/src/lib/firebase.ts` in your project
2. Replace the placeholder firebaseConfig object with your actual Firebase configuration
3. Save the file

## Step 6: Set Up Firestore Rules

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click the "Rules" tab
3. Update the rules to allow reading and writing to the leaderboard collection:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{entry} {
      allow read;
      allow write: if request.resource.data.name is string && 
                     request.resource.data.score is number;
    }
  }
}
```

4. Click "Publish"

## Step 7: Deploy Your App

1. Deploy your app to Vercel as usual
2. Add your Vercel deployment URL to the authorized domains in Firebase:
   - Go to Authentication > Settings > Authorized domains
   - Add your Vercel domain (e.g., `gas-station-simulator.vercel.app`)

Your global leaderboard should now be working! Players from around the world will see the same leaderboard when they play your game.
