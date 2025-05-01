// Home.js
import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="top-nav">
        <Link to="/about" className="nav-link">
          <Button className="nav-button">About Us</Button>
        </Link>
        <Link to="/home">Home</Link>

        <Link to="/register" className="nav-link">
          <Button className="nav-button">Register</Button>
        </Link>
      </div>
      
      <div className="center-content">
        <Typography variant="h4" className="welcome-text">Welcome to the Event Management System</Typography>
        <Button className="sign-in-button">Sign In</Button>
        <Typography variant="h6" className="register-text">Don't have an account? <Link to="/register" className="register-link">Register here</Link></Typography>
      </div>
    </div>
  );
};

export default Home;
