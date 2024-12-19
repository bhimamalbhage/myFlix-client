import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./SignupView.css";

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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        <p className="subtitle">Join us and explore amazing movies!</p>
        <div className="input-group">
          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            className="signup-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="date"
            name="birthday"
            className="signup-input"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="login-prompt">
        <p>
          Already have an account?{" "}
          <button type="button" className="login-button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

SignupView.propTypes = {
  onSignedUp: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired,
};

export default SignupView;
