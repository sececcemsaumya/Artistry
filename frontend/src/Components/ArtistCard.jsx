import React from "react";

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-card">
      <img className="artist-card-img" src={artist.image} alt={artist.name} />
      <div className="artist-card-content">
        <h3 className="artist-card-name">{artist.name}</h3>
        <p className="artist-card-bio">{artist.bio}</p>
        <a className="artist-card-link" href={artist.wiki} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArtistCard;
