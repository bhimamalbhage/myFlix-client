import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import "./NavigationBar.css";

const NavigationBar = ({ user, onLogout, searchValue, onSearchChange }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Navbar bg="black" variant="dark" expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand">
          <span className="brand-logo">MyFlix</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/" className={isHome ? "active-link" : ""}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
          
          {user && isHome && (
            <Form className="d-flex search-form">
              <div className="search-container">
                <i className="fa fa-search search-icon"></i>
                <Form.Control
                  type="search"
                  placeholder="Search movies..."
                  className="search-input"
                  aria-label="Search"
                  value={searchValue}
                  onChange={onSearchChange}
                />
              </div>
            </Form>
          )}
          
          <Nav>
            {user ? (
              <Button variant="outline-danger" onClick={onLogout} className="logout-btn">
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="auth-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="auth-link">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
