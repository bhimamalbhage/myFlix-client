import React, { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ProfileView.css';

const ProfileView = ({ user, movies }) => {
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [birthday, setBirthday] = useState(""); // Separate state for birthday
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .get(`https://movies-flix-bhima-f885454e03b7.herokuapp.com/users/${user.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userData = response.data;
        const formattedBirthday = userData.Birthday
          ? new Date(userData.Birthday).toISOString().split("T")[0]
          : ""; // Default to an empty string if Birthday is null/undefined
        setUpdatedUserData(userData);
        setBirthday(formattedBirthday); // Initialize birthday state
        const favoriteMoviesList = movies.filter((movie) =>
          userData.favoriteMovies.includes(movie._id)
        );
        setFavoriteMovies(favoriteMoviesList);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching user data.");
        setIsLoading(false);
      });
  }, [user, movies]);

  const handleRemoveFavorite = (movieId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://movies-flix-bhima-f885454e03b7.herokuapp.com/users/${user.username}/favorites/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setFavoriteMovies((prev) => prev.filter((movie) => movie._id !== movieId));
      })
      .catch(() => {
        setError("Error removing movie from favorites.");
      });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    const dataToUpdate = { ...updatedUserData, Birthday: birthday }; // Include separate birthday field
    axios
      .put(
        `https://movies-flix-bhima-f885454e03b7.herokuapp.com/users/${user.username}`,
        dataToUpdate,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Profile Updated");
        setUpdatedUserData(response.data);
        setError(null);
      })
      .catch(() => {
        setError("Error updating user information.");
      });
  };

  const handleDeregister = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://movies-flix-bhima-f885454e03b7.herokuapp.com/users/${user.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch(() => {
        setError("Error deregistering user.");
      });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" variant="light" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="animated-alert">{error}</Alert>;
  }

  if (!user) {
    return <Alert variant="danger">User not authenticated</Alert>;
  }

  return (
    <div className="profile-page">
      <div className="background-gradient"></div>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="profile-card">
            <div className="text-center mb-4">
              <h1 className="brand-logo">MyFlix</h1>
              <h2 className="profile-title">User Profile</h2>
            </div>

            <Form className="profile-form">
              <Form.Group controlId="username" className="mb-3 form-group">
                <Form.Label className="form-label">Username</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-user"></i>
                  <Form.Control
                    type="text"
                    value={updatedUserData.username}
                    disabled
                    className="styled-input"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3 form-group">
                <Form.Label className="form-label">Email</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-envelope"></i>
                  <Form.Control
                    type="email"
                    value={updatedUserData.email}
                    onChange={(e) =>
                      setUpdatedUserData({ ...updatedUserData, email: e.target.value })
                    }
                    className="styled-input"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="birthday" className="mb-3 form-group">
                <Form.Label className="form-label">Birthday</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-calendar"></i>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="styled-input"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="password" className="mb-4 form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-lock"></i>
                  <Form.Control
                    type="password"
                    placeholder="Change your password"
                    onChange={(e) =>
                      setUpdatedUserData({ ...updatedUserData, password: e.target.value })
                    }
                    className="styled-input"
                  />
                </div>
              </Form.Group>

              <Button variant="primary" onClick={handleUpdate} className="update-button">
                Update Profile
              </Button>
              <Button variant="danger" onClick={handleDeregister} className="deregister-button">
                Deregister
              </Button>
            </Form>

            <h3 className="favorite-movies-title">Favorite Movies</h3>
            <div className="favorite-movies-grid">
              {favoriteMovies.map((movie) => (
                <Card key={movie._id} className="favorite-movie-card">
                  <Card.Img
                    variant="top"
                    src={movie.imageUrl}
                    alt={`${movie.title} Poster`}
                    className="movie-poster"
                  />
                  <Card.Body>
                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                    <Button
                      variant="warning"
                      onClick={() => handleRemoveFavorite(movie._id)}
                      className="remove-favorite-button"
                    >
                      Remove from Favorites
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileView;