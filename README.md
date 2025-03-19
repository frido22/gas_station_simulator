# 🛢️ Pump Perfection: Gas Station Simulator

A humorous mobile-web game where players must precisely stop filling their gas tank at an exact dollar amount—no more, no less!

## 🎮 Game Overview

**Pump Perfection** is a quirky, retro-inspired gas station simulator built with Next.js and Three.js. The game challenges players to stop the gas pump at EXACTLY the target amount, testing their timing and precision.

### Features:

- 🎨 Vibrant, retro gas station aesthetic with playful animations
- 🎵 Funny sound effects and reactions
- 📱 Mobile-optimized touch controls
- 🏆 Leaderboard with humorous titles for top players
- 🎯 Progressive difficulty levels
- 💰 Score tracking and high score saving

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the game.

## 📱 Mobile Testing

For the best experience, this game is designed for mobile devices. To test on your mobile device:

1. Make sure your computer and mobile device are on the same network
2. Find your computer's local IP address (e.g., 192.168.1.X)
3. Run the development server with the host flag:
   ```bash
   npm run dev -- -H 0.0.0.0
   ```
4. On your mobile device, navigate to `http://YOUR_IP_ADDRESS:3000`

## 🎲 How to Play

1. Press "START PUMPING!" to begin
2. Touch and hold the screen (or use the PUMP GAS button) to start pumping gas
3. Release when you think you've reached the target amount
4. Try to stop as close as possible to the target amount
5. Beat your high score and climb the leaderboard!

## 🛠️ Tech Stack

- **Next.js** - React framework
- **Three.js** - 3D graphics and animations
- **TailwindCSS** - Styling
- **GSAP** - Animations
- **Howler.js** - Sound effects
- **NippleJS** - Touch controls

## 🧠 Game Mechanics

- Each level increases the target amount and difficulty
- Perfect stops earn maximum points
- Close stops earn partial points
- Overshooting results in a fail
- Time pressure adds to the challenge

## 🎨 Design Credits

- Fonts: Google Fonts (Bangers, Luckiest Guy, Permanent Marker)
- Sound effects: Created for this game
- Concept and design: Original creation

## 📝 License

This project is licensed under the MIT License.
