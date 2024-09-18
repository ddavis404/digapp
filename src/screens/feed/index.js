import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import "./feed.css"; // Import the feed CSS for styling
import { useNavigate } from "react-router-dom"; // Import the navigate hook

export default function Feed() {
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  const navigate = useNavigate(); // Use the navigate hook

  useEffect(() => {
    // Fetch user's top tracks from Spotify API
    APIKit.get("me/top/tracks")
      .then((response) => {
        console.log("API response:", response); // Debugging log
        setTopTracks(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top tracks:", error);
        setError("Failed to load top tracks.");
        setLoading(false);
      });
  }, []);

  // Function to play the selected track
  const playTrack = (track) => {
    navigate("/player", { state: { track } }); // Navigate to player with track data
  };

  if (loading) return <div className="screen-container">Loading...</div>;
  if (error) return <div className="screen-container">{error}</div>;

  return (
    <div className="screen-container">
      <div className="feed-body">
        <h2 className="feed-title">Your Top Tracks</h2>
        <div className="recent-tracks">
          {topTracks.map((track) => (
            <div
              className="track-card"
              key={track.id}
              onClick={() => playTrack(track)} // Play the track on click
            >
              <img
                src={track.album.images[0].url}
                className="track-image"
                alt="Track Art"
              />
              <div className="track-info">
                <p className="track-title">{track.name}</p>
                <p className="track-artist">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
