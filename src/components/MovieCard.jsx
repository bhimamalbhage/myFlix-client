import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieCard;
