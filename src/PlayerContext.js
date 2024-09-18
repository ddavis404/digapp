import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const addTracks = (newTracks) => {
    setTracks(newTracks);
    setCurrentIndex(0);
    setCurrentTrack(newTracks[0]);
    setIsPlaying(true);
  };

  const updatePlayer = (track, index) => {
    setCurrentTrack(track);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        tracks,
        addTracks,
        updatePlayer,
        setIsPlaying,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
