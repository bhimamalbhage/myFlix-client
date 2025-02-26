import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./MovieCard.css";

const MovieCard = ({ movie, onFavorite }) => (
  <div className="movie-card-container">
    <Card className="movie-card">
      <div className="poster-container">
        <Card.Img
          variant="top"
          src={movie.imageUrl}
          alt={`${movie.title} Poster`}
          className="movie-poster"
        />
        {/* <div className="poster-overlay">
          <button 
            className="watch-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa fa-play-circle"></i> Watch
          </button>
        </div> */}
      </div>
      <Card.Body className="movie-card-body">
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <div className="movie-meta">
          {movie.genre && (
            <span className="movie-genre">{movie.genre.name}</span>
          )}
          {movie.year && (
            <span className="movie-year">{movie.year}</span>
          )}
        </div>
        <button
          className="favorite-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorite(movie._id);
          }}
        >
          <i className="fa fa-heart"></i> Add to Favorites
        </button>
      </Card.Body>
    </Card>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.object,
    year: PropTypes.string,
  }).isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MovieCard;
