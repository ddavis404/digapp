import React from "react";
import { usePlayer } from "../PlayerContext"; // Import the context
import AudioPlayer from "./audioPlayer"; // Your existing audio player component

export default function PlayerControls() {
  const {
    currentTrack,
    tracks,
    isPlaying,
    setIsPlaying,
    currentIndex,
    setCurrentIndex,
  } = usePlayer(); // Access global player state

  return (
    <div className="player-controls">
      {/* Render the AudioPlayer component globally */}
      <AudioPlayer
        currentTrack={currentTrack}
        total={tracks}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
