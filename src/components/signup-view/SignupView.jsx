import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import './SignupView.css'

const SignupView = ({ onSignedUp, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.length < 5) {
      setError("Username must be at least 5 characters long.");
      return;
    }
    axios
      .post("https://movies-flix-bhima-f885454e03b7.herokuapp.com/users", {
        Username: formData.username,
        Password: formData.password,
        Email: formData.email,
        Birthday: formData.birthday,
      })
      .then(() => {
        onSignedUp();
      })
      .catch(() => {
        setError("Error signing up. Please try again.");
      });
  };

  return (
    <Container className="mt-5 signup-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Create an Account</h2>
          <p className="text-center">Join us and explore amazing movies!</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signupUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupBirthday" className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <Button variant="outline-primary" onClick={onSwitchToLogin}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
              }}
              >
                Login
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

SignupView.propTypes = {
  onSignedUp: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired,
};

export default SignupView;
