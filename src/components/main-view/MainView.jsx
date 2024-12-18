import React, { useState, useEffect } from "react";
import LoginView from "../login-view/LoginView";
import SignupView from "../signup-view/SignupView";
import MovieCard from "../movie-card/MovieCard";
import MovieView from "../movie-view/MovieView";
import axios from "axios";
import './MainView.css'

const MainView = () => {
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    axios
      .get("https://movies-flix-bhima-f885454e03b7.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!user) {
    return isSignup ? (
      <SignupView
        onSignedUp={() => setIsSignup(false)}
        onSwitchToLogin={() => setIsSignup(false)}
      />
    ) : (
      <LoginView onLoggedIn={setUser} onSwitchToSignup={() => setIsSignup(true)} />
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBack={() => setSelectedMovie(null)} />;
  }

  return (
    <div>
  <div className="header">
    <h1>MyFlix Movies</h1>
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  </div>
  <div className="movie-list">
    {movies.map((movie) => (
      <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
    ))}
  </div>
</div>


  );
};

export default MainView;
