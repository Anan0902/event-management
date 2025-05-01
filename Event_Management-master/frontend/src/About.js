import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About <span className="highlight">DAP</span> ✨</h1>
      <p className="about-description">
        DAP is your ultimate destination for seamless event planning and participation. We connect hosts with enthusiastic participants
        and provide a smooth, intuitive platform to manage events effortlessly.
      </p>

      <div className="features-section">
        <h2>🌟 Features</h2>
        <ul>
          <li>🎉 Host your own events</li>
          <li>📝 Simple registration for participants</li>
          <li>📊 Dashboard insights and analytics</li>
          <li>📅 Calendar integration</li>
          <li>🔒 Secure login for both hosts and participants</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
