import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import "./MovieView.css";

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

  // const handleFavorite = async (movieId) => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .post(
  //       `https://movies-flix-bhima-f885454e03b7.herokuapp.com/currentUsers/${currentUser.username}/favorites/${movieId}`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       alert("Added to Favorites");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!movie) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" variant="light" />
      </div>
    );
  }

  return (
    <div className="movie-view-container">
      <Row>
        <Col md={4}>
          <div className="movie-poster-container">
            <img
              src={movie.imageUrl}
              alt={`${movie.title} Poster`}
              className="movie-detail-poster"
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="movie-details">
            <h1 className="movie-detail-title">{movie.title}</h1>
            
            <div className="movie-meta-info">
              {movie.year && <span className="movie-year">{movie.year}</span>}
              {movie.genre && <span className="movie-genre">{movie.genre.name}</span>}
              {movie.director && <span className="movie-director">Dir: {movie.director.name}</span>}
            </div>
            
            <div className="movie-description">
              <p>{movie.description}</p>
            </div>
            
            <div className="movie-actions">
              <Button 
                variant="primary" 
                className="watch-button"
              >
                <i className="fa fa-play-circle"></i> Watch Now
              </Button>
              
              {/* <Button 
                variant="outline-light" 
                className="favorite-button"
                onClick={() => handleFavorite(movie._id)}
              >
                <i className="fa fa-heart"></i> Add to Favorites
              </Button> */}
              
              <Button 
                variant="outline-secondary" 
                className="back-button"
                onClick={() => navigate("/")}
              >
                <i className="fa fa-arrow-left"></i> Back to Movies
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default MovieView;
