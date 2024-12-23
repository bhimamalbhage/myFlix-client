import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const MovieCard = ({ movie, onFavorite }) => (
  <Card className="movie-card"  style={{ cursor: "pointer", marginBottom: "20px" }}>
    <Card.Img 
      variant="top" 
      src={movie.imageUrl} 
      alt={`${movie.title} Poster`} 
      style={{ maxHeight: "200px", objectFit: "contain", backgroundColor: "#f8f9fa" }} 
    />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Button variant="warning" onClick={(e) => { e.preventDefault(); onFavorite(movie._id); }}>
        Add to Favorites
      </Button>
    </Card.Body>
  </Card>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default MovieCard;
