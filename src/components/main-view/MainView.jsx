import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoginView from "../login-view/LoginView";
import SignupView from "../signup-view/SignupView";
import MovieCard from "../movie-card/MovieCard";
import MovieView from "../movie-view/MovieView";
import axios from "axios";
import './MainView.css';

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
    <Container>
      <Row className="justify-content-between align-items-center bg-dark text-white py-3">
        <Col>
          <h1>MyFlix Movies</h1>
        </Col>
        <Col className="text-end">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        {movies.map((movie) => (
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
            <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainView;
