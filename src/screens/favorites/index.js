import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import "./favorites.css";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use the navigate hook

  useEffect(() => {
    // Fetch user's saved tracks from Spotify API
    APIKit.get("me/tracks")
      .then((response) => {
        setFavorites(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites.");
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
      <div className="favorites-body">
        <h2 className="favorites-title">Your Favorite Tracks</h2>
        <div className="favorites-tracks">
          {favorites.map((item) => (
            <div
              className="track-card"
              key={item.track.id}
              onClick={() => playTrack(item.track)} // Play the track on click
            >
              <img
                src={item.track.album.images[0].url}
                className="track-image"
                alt="Track Art"
              />
              <div className="track-info">
                <p className="track-title">{item.track.name}</p>
                <p className="track-artist">
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
