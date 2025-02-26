import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './SignupView.css';

const SignupView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthday: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
        setSuccess(true);
        setError("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch(() => {
        setError("Error signing up. Please try again.");
        setSuccess(false);
      });
  };

  return (
    <div className="signup-page">
      <div className="background-gradient"></div>
      <Container className='signup-container'>
        <Row className="justify-content-center">
          <Col md={6} lg={5} className="signup-card">
            <div className="text-center mb-4">
              <h1 className="brand-logo">MyFlix</h1>
              <h2 className="signup-title">Create Your Account</h2>
              <p className="signup-subtitle">Join our community of movie enthusiasts</p>
            </div>
            
            <Form onSubmit={handleSubmit} className="signup-form">
              <Form.Group controlId="signupUsername" className="mb-3 form-group">
                <Form.Label className="form-label">Username</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-user"></i>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="styled-input"
                  />
                </div>
                <small className="text-muted">Must be at least 5 characters</small>
              </Form.Group>
              
              <Form.Group controlId="signupPassword" className="mb-3 form-group">
                <Form.Label className="form-label">Password</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-lock"></i>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="styled-input"
                  />
                </div>
              </Form.Group>
              
              <Form.Group controlId="signupEmail" className="mb-3 form-group">
                <Form.Label className="form-label">Email</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-envelope"></i>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="styled-input"
                  />
                </div>
              </Form.Group>
              
              <Form.Group controlId="signupBirthday" className="mb-4 form-group">
                <Form.Label className="form-label">Birthday</Form.Label>
                <div className="input-container">
                  <i className="input-icon fas fa-calendar"></i>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="styled-input"
                  />
                </div>
              </Form.Group>
              
              {error && <Alert variant="danger" className="animated-alert">{error}</Alert>}
              {success && <Alert variant="success" className="animated-alert">Sign up successful! Redirecting to login...</Alert>}
              
              <Button variant="primary" type="submit" className="signup-button">
                Create Account
              </Button>
            </Form>
            
            <div className="text-center mt-4 login-option">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Log in
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupView;