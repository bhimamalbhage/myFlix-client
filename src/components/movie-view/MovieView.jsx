import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const MovieView = ({ movie, onBack }) => {
  return (
    <Card className="movie-view mx-auto" style={{ maxWidth: "600px", marginTop: "20px" }}>
      <Card.Img 
        variant="top" 
        src={movie.imageUrl} 
        alt={`${movie.title} Poster`} 
        style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} 
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {movie.description}
        </Card.Text>
        <Card.Text>
          <strong>Director:</strong> {movie.director.name}
        </Card.Text>
        <Card.Text>
          <strong>Genre:</strong> {movie.genre.name}
        </Card.Text>
        <Button variant="primary" onClick={onBack}>
          Back to Main View
        </Button>
      </Card.Body>
    </Card>
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
