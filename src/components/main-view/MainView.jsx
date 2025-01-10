import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import NavigationBar from "../navigation-bar/NavigationBar";
import LoginView from "../login-view/LoginView";
import SignupView from "../signup-view/SignupView";
import MovieCard from "../movie-card/MovieCard";
import MovieView from "../movie-view/MovieView";
import ProfileView from "../profile-view/ProfileView";
import axios from "axios";
import "./MainView.css";

const MainView = () => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState(""); 

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

  const handleAddToFavorites = (movieId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://movies-flix-bhima-f885454e03b7.herokuapp.com/users/${user.username}/favorites/${movieId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Added to Favorites");
      })
      .catch((error) => {
        console.log("error in adding favorites", error);
      });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Router>
      <NavigationBar user={user} onLogout={handleLogout} />

      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Form.Group controlId="movieFilter" className="mb-3">
                    <Form.Label>Filter Movies</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search by title..."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </Form.Group>

                  <Row>
                    {filteredMovies.length > 0 ? (
                      filteredMovies.map((movie) => (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          className="mb-4"
                          key={movie._id}
                        >
                          <Link to={`/movies/${movie._id}`}>
                            <MovieCard
                              movie={movie}
                              onFavorite={handleAddToFavorites}
                            />
                          </Link>
                        </Col>
                      ))
                    ) : (
                      <p>No movies found matching the criteria.</p>
                    )}
                  </Row>
                </>
              ) : (
                <LoginView onLoggedIn={setUser} />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <MovieView movieData={movies} currentUser={user} />
              ) : (
                <LoginView onLoggedIn={setUser} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView user={user} movies={movies} />
              ) : (
                <LoginView onLoggedIn={setUser} />
              )
            }
          />
          <Route path="/login" element={<LoginView onLoggedIn={setUser} />} />
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default MainView;
