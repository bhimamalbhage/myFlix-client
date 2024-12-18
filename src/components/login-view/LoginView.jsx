import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./LoginView.css";

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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <p className="subtitle">Please log in to your account</p>
        <div className="input-group">
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <div className="signup-prompt">
        <p>
          Don't have an account?{" "}
          <button type="button" className="signup-button" onClick={onSwitchToSignup}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onSwitchToSignup: PropTypes.func.isRequired,
};

export default LoginView;
