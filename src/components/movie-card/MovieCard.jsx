import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const MovieCard = ({ movie, onClick }) => (
  <Card className="movie-card" onClick={onClick} style={{ cursor: "pointer", marginBottom: "20px" }}>
    <Card.Img 
      variant="top" 
      src={movie.imageUrl} 
      alt={`${movie.title} Poster`} 
      style={{ maxHeight: "200px", objectFit: "contain", backgroundColor: "#f8f9fa" }} 
    />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
    </Card.Body>
  </Card>
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
