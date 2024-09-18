import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay, FaBars } from "react-icons/fa"; // Import FaBars for the menu icon
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../spotify";

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    apiClient.get("me").then((response) => {
      if (response.data.images && response.data.images.length > 0) {
        setImage(response.data.images[0].url);
      }
    });
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Automatically show/hide sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); // Show sidebar for large screens
      } else {
        setIsSidebarOpen(false); // Hide sidebar for small screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        {/* Menu Icon to Toggle Sidebar */}
        <FaBars size={24} color="#E99D72" />
      </div>

      {/* Sidebar Container */}
      <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
        <img src={image} className="profile-img" alt="profile" />
        <div>
          <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
          <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
          <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
          <SidebarButton
            title="Favorites"
            to="/favorites"
            icon={<MdFavorite />}
          />
          <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
        </div>
        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
      </div>
    </>
  );
}
