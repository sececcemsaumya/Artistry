import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
/** */
  return (
    <div className="video-container">
       <video autoPlay loop muted playsInline className="background-video">
        <source src="/landingpage3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="overlay"></div> {/* Semi-transparent overlay */}

      <div className="hero-content">
        <h1 className="title">Artistry</h1>
        <p className="tagline">Explore. Feel. Collect.</p>
        <h2 className="subtitle">Where Every Stroke Inspires Wonder</h2>
        <p className="description">
          Dive into a world of creativity.<br />
          Discover, create, and connect with art lovers everywhere.
        </p>
        <button className="explore-button" onClick={handleLogin}>
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default Home;