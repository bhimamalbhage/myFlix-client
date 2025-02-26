import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://movies-flix-bhima-f885454e03b7.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const moviesData = response.data;
        setMovies(moviesData);

        console.log("moviesData", moviesData);
        
        // Extract unique genres for category filter
        const uniqueGenres = [...new Set(
          moviesData
            .filter(movie => movie.genre && movie.genre.name)
            .map(movie => movie.genre.name)
        )];
        setCategories(uniqueGenres);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
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

  const filteredMovies = movies.filter((movie) => {
    // Filter by search text
    const matchesSearch = movie.title.toLowerCase().includes(filter.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      selectedCategory === "All" || 
      (movie.genre && movie.genre.name === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <div className="app-container">
        <NavigationBar 
          user={user} 
          onLogout={handleLogout} 
          searchValue={filter}
          onSearchChange={(e) => setFilter(e.target.value)}
        />

        <Container fluid className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <>
                    <div className="hero-section">
                      <div className="hero-content">
                        <h1>Welcome to MyFlix</h1>
                        <p>Discover amazing movies and build your collection</p>
                      </div>
                    </div>
                    
                    <div className="category-filters">
                      <button 
                        className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('All')}
                      >
                        All
                      </button>
                      {categories.map(category => (
                        <button 
                          key={category}
                          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>

                    {loading ? (
                      <div className="loading-container">
                        <div className="spinner"></div>
                      </div>
                    ) : (
                      <Row className="movie-grid">
                        {filteredMovies.length > 0 ? (
                          filteredMovies.map((movie) => (
                            <Col
                              xs={12}
                              sm={6}
                              md={4}
                              lg={3}
                              xl={2}
                              className="movie-col"
                              key={movie._id}
                            >
                              <Link to={`/movies/${movie._id}`} className="movie-link">
                                <MovieCard
                                  movie={movie}
                                  onFavorite={handleAddToFavorites}
                                />
                              </Link>
                            </Col>
                          ))
                        ) : (
                          <div className="no-results">
                            <i className="fa fa-film"></i>
                            <p>No movies found matching your criteria.</p>
                          </div>
                        )}
                      </Row>
                    )}
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
      </div>
    </Router>
  );
};

export default MainView;