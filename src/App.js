import React from "react";
import Home from "./screens/home";
import { PlayerProvider } from './PlayerContext'; // Import PlayerProvider

export default function App() {
  return (
    // Wrap the entire app in the PlayerProvider to provide global state management for the player
    <PlayerProvider>
      <div>
        <Home />
      </div>
    </PlayerProvider>
  );
}
