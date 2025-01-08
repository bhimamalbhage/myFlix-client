import React, { useState, useEffect } from "react";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    return <Spinner animation="border" role="status" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user) {
    return <Alert variant="danger">User not authenticated</Alert>;
  }

  return (
    <div>
      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={updatedUserData.username} disabled />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedUserData.email}
                onChange={(e) =>
                  setUpdatedUserData({ ...updatedUserData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="birthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)} // Handle birthday separately
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Change your password"
                onChange={(e) =>
                  setUpdatedUserData({ ...updatedUserData, password: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate} className="mt-3">
              Update Profile
            </Button>
            <Button variant="danger" onClick={handleDeregister} className="mt-3" style={{marginLeft:'5px'}}>
              Deregister
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h3 className="mt-4">Favorite Movies</h3>
      <div className="movie-cards" style={{ display: "flex" }}>
        {favoriteMovies.map((movie) => (
          <Card className="movie-card" key={movie._id} style={{ cursor: "pointer", marginBottom: "20px" }}>
            <Card.Img
              variant="top"
              src={movie.imageUrl}
              alt={`${movie.title} Poster`}
              style={{ maxHeight: "200px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Button variant="warning" onClick={() => handleRemoveFavorite(movie._id)}>
                Remove from Favorites
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
