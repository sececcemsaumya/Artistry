import React from "react";
import ArtistCard from "./ArtistCard";
import { useNavigate } from "react-router-dom";

const ArtistGallery = ({ artists }) => {
  const navigate = useNavigate();
  const handleclick = () => navigate('/');
  const aboutUs = () => navigate('/about');
  const artistsNav = () => navigate('/artists');
  const artworks = () => navigate('/artworks');

  return (
    <div className="artist-gallery-page">
      <nav className="navbar glass-navbar">
        <div className="navbar-left" onClick={handleclick}>
          <span className="logo">🎨 Artistry</span>
        </div>
        <div className="navbar-center">
          <a onClick={handleclick}>Home</a>
          <a onClick={aboutUs}>About Us</a>
          <a onClick={artistsNav}>Artists</a>
          <a onClick={artworks}>ArtWorks</a>
          <a onClick={handleclick}>Logout</a>
        </div>
      </nav>
      <div className="artist-gallery-grid">
        {artists.map((artist, index) => (
          <ArtistCard key={index} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistGallery;
