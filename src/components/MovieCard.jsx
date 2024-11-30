import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({ movie, onClick }) => (
  <div className="movie-card" onClick={onClick} style={{ cursor: "pointer" }}>
    <h2>{movie.title}</h2>
    <img src={movie.imageUrl} alt={`${movie.title} Poster`} style={{ width: "200px" }} />
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;
