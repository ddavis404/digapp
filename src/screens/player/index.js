import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPlayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artistID, setArtistID] = useState("");

  useEffect(() => {
    if (location.state) {
      if (location.state.id) {
        // Handle playlist case
        apiClient
          .get("playlists/" + location.state.id + "/tracks")
          .then((res) => {
            const playlistTracks = res.data.items.map((item) => ({
              track: item.track,
            }));
            setTracks(playlistTracks);
            setCurrentTrack(playlistTracks[0].track);
            setArtistID(playlistTracks[0].track.artists[0]?.id);
          });
      } else if (location.state.track) {
        // Handle single track case
        setTracks([{ track: location.state.track }]);
        setCurrentTrack(location.state.track);
        setArtistID(location.state.track.artists[0]?.id);
        setCurrentIndex(0);
      } else if (location.state.album) {
        // Handle album case
        const albumId = location.state.album.id;
        apiClient
          .get(`albums/${albumId}/tracks`)
          .then((res) => {
            const albumTracks = res.data.items.map((track) => ({
              track: track,
            }));
            setTracks(albumTracks);
            setCurrentTrack(albumTracks[0].track);
            setArtistID(albumTracks[0].track.artists[0]?.id);
            setCurrentIndex(0);
          });
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (tracks.length > 0 && tracks[currentIndex]?.track) {
      setCurrentTrack(tracks[currentIndex].track);
      setArtistID(tracks[currentIndex].track.artists[0]?.id);
    }
  }, [currentIndex, tracks]);

  // Normalize data for AlbumInfo and AlbumImage components
  const albumArtUrl =
    currentTrack.album?.images?.[0]?.url || // Album cover from album data
    currentTrack.images?.[0]?.url || ""; // Track image if it exists directly on the track object

  const albumName = currentTrack.album?.name || currentTrack.name; // Fallback to track name
  const albumArtists = currentTrack.album?.artists || currentTrack.artists; // Fallback to track artist
  const albumType = currentTrack.album?.album_type || "Single"; // Fallback to "Single"
  const totalTracks = currentTrack.album?.total_tracks || 1; // Fallback to 1 track
  const releaseDate = currentTrack.album?.release_date || "Unknown"; // Fallback to "Unknown"

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={artistID} />
      </div>
      <div className="right-player-body">
        {/* Pass the normalized album data to SongCard */}
        <SongCard
          album={{
            images: [{ url: albumArtUrl }],
            name: albumName,
            artists: albumArtists,
            album_type: albumType,
            total_tracks: totalTracks,
            release_date: releaseDate,
          }}
        />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
