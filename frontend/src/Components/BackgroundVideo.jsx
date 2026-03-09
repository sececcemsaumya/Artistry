import React from "react";
import { useNavigate } from "react-router-dom";

const BackgroundVideo = () => {
  const navigate = useNavigate();

  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="hero-content">
        <h1>Unleash the Magic of Art</h1>
        <p>Discover breathtaking artworks and connect with passionate artists around the world.</p>
        <a href="#" className="cta-button" onClick={() => navigate("/artworks")}>Explore Art</a>
      </div>
    </div>
  );
};

export default BackgroundVideo;
