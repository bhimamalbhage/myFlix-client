import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import './LoginView.css'

const LoginView = ({ onLoggedIn, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://movies-flix-bhima-f885454e03b7.herokuapp.com/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        onLoggedIn(user);
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  };

  return (
    <Container className="mt-5 login-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Welcome Back!</h2>
          <p className="text-center">Please log in to your account</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="loginPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="w-100">
              Log In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Button variant="outline-primary" onClick={onSwitchToSignup}
               style={{
                backgroundColor: "#ff5722",
                color: "#fff",
                border: "none",
              }}
              >
                Sign Up
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onSwitchToSignup: PropTypes.func.isRequired,
};

export default LoginView;
