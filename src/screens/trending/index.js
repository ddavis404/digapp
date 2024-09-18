import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import "./trending.css";
import { useNavigate } from "react-router-dom";

export default function Trending() {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    APIKit.get("browse/new-releases")
      .then((response) => {
        setTrendingTracks(response.data.albums.items);
      })
      .catch((error) => console.error("Error fetching trending tracks:", error));
  }, []);

  const playAlbum = (album) => {
    navigate("/player", { state: { album } }); // Navigate to player with album data
  };

  return (
    <div className="screen-container">
      <div className="trending-body">
        <h2 className="trending-title">Trending Now</h2>
        <div className="trending-tracks">
          {trendingTracks.map((album) => (
            <div
              className="track-card"
              key={album.id}
              onClick={() => playAlbum(album)} // Play the album on click
            >
              <img
                src={album.images[0].url}
                className="track-image"
                alt="Album Art"
              />
              <div className="track-info">
                <p className="track-title">{album.name}</p>
                <p className="track-artist">
                  {album.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
