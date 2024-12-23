import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MovieView = ({ movieData, currentUser }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundMovie = movieData.find((movie) => movie._id === movieId);
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      setError("Movie not found");
    }
  }, [movieData, movieId]);

  const handleFavorite = async (movieId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://movies-flix-bhima-f885454e03b7.herokuapp.com/currentUsers/${currentUser.currentUsername}/favorites/${movieId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Added to Favorites");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!movie) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

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
        {currentUser && (
          <Button variant="warning" onClick={() => handleFavorite(movie._id)} style={{ marginRight: '5px'}}>
            Add to Favorites
          </Button>
        )}
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Main View
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default MovieView;
