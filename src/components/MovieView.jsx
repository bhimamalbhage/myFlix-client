import React from "react";

const MovieView = ({ movie, onBack }) => {
  return (
    <div className="movie-view">
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={`${movie.title} Poster`} />
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <button onClick={onBack}>Back to Main View</button>
    </div>
  );
};

export default MovieView;
