import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/artgallerycoverpage1.png';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <nav className="navbar glass-navbar">
        <div className="navbar-left" onClick={() => navigate('/')}>
          <span className="logo">🎨 Artistry</span>
        </div>
        <div className="navbar-center">
          <a onClick={() => navigate('/')}>Home</a>
          <a onClick={() => navigate('/about')}>About Us</a>
          <a onClick={() => navigate('/artists')}>Artists</a>
          <a onClick={() => navigate('/artworks')}>ArtWorks</a>
          <a onClick={() => navigate('/contact')}>Contact</a>
          <a onClick={() => navigate('/')}>Logout</a>
        </div>
      </nav>

      <section className="about-us">
        <div className="about-us__container">
          <div className="about-us__image">
            <img src={backgroundImage} alt="Art palette and brushes" />
          </div>
          <div className="about-us__content">
            <h1 className="about-us__title">About Us</h1>
            <p className="about-us__slogan">Where Walls Speak and Art Comes to Life</p>
            <p className="about-us__intro">
              At <span className="about-us__brand-name">Artistry</span>, we believe every wall has a story waiting to be told.<br />
              With passion and creativity, we transform blank spaces into works of art that inspire, captivate, and evoke emotion.
            </p>
            <p className="about-us__closing-text">
              Join us in turning your space into a masterpiece that speaks to the heart.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
