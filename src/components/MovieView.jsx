import React from "react";
import PropTypes from "prop-types";

const MovieView = ({ movie, onBack }) => {
  return (
    <div className="movie-view">
      <h1>{movie.title}</h1>
      <img src={movie.imageUrl} alt={`${movie.title} Poster`} style={{ width: "300px" }} />
      <p><strong>Description:</strong> {movie.genre?.description}</p>
      <p><strong>Director:</strong> {movie.director.name}</p>
      <p><strong>Genre:</strong> {movie.genre.name}</p>
      <button onClick={onBack}>Back to Main View</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default MovieView;
