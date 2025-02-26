import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './LoginView.css';

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://movies-flix-bhima-f885454e03b7.herokuapp.com/login", {
        username,
        password,
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        onLoggedIn(user);
        navigate("/");
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  };

  return (
    <div className="login-page">
      <div className="background-gradient"></div>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} className="login-card">
            <div className="text-center mb-4">
              <h1 className="brand-logo">MyFlix</h1>
              <h2 className="login-title">Welcome Back!</h2>
              <p className="login-subtitle">Please log in to your account</p>
            </div>
            
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group controlId="loginUsername" className="mb-3 form-group">
                <Form.Label className="form-label">Username</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-user"></i>
                  <Form.Control
                    type="text"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="styled-input"
                  />
                </div>
              </Form.Group>
              
              <Form.Group controlId="loginPassword" className="mb-4 form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-lock"></i>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="styled-input"
                  />
                </div>
              </Form.Group>
              
              {error && <Alert variant="danger" className="animated-alert">{error}</Alert>}
              
              <Button variant="primary" type="submit" className="login-button">
                Log In
              </Button>
            </Form>
            
            <div className="text-center mt-4 signup-option">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;