// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Make sure your styles match your violet-pink-black theme

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/account-choice');
  };

  return (
    <nav className="navbar glass-navbar">
      <div className="navbar-left">
        <span className="navbar-logo">DAP</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <button className="sign-in-button" onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
