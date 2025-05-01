import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-brand">DAP</div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/events" className="nav-link">Events</Link>
      </div>
    </nav>
  );
};

export default Navbar;
