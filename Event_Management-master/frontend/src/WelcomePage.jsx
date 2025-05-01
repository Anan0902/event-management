// src/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <h1 className="welcome-title">🎉 Welcome to <span className="brand-name">DAP</span>!</h1>
      <p className="welcome-subtitle">Your ultimate event management solution 💫</p>
      <button className="get-started-btn" onClick={() => navigate('/login')}>
        🚀 Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
