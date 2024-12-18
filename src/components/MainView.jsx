import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieView from "./MovieView";
import PropTypes from "prop-types";
import axios from "axios";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    
    axios
      .get("https://movies-flix-bhima-f885454e03b7.herokuapp.com/movies")
      .then((response) => {
        console.log("movie response", response);
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBack={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      <h1>MyFlix Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>
    </div>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
};

export default MainView;
