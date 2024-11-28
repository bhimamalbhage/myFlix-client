import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieView from "./MovieView";

import inceptionImg from "../img/inception.jpg";
import titanicImg from "../img/titanic.jpg";
import matrixImg from "../img/matrix.jpg";

const MainView = () => {
  const [movies] = useState([
    { id: 1, title: "Inception", description: "A mind-bending thriller.", director: "Christopher Nolan", genre: "Sci-Fi", poster: inceptionImg },
    { id: 2, title: "Titanic", description: "A romantic tragedy.", director: "James Cameron", genre: "Drama", poster: titanicImg },
    { id: 3, title: "The Matrix", description: "A sci-fi action masterpiece.", director: "The Wachowskis", genre: "Sci-Fi", poster: matrixImg },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBack={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
      <h1>MyFlix Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>
    </div>
  );
};

export default MainView;
