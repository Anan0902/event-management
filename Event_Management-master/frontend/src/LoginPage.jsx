import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        emailOrUsername,
        password,
      });

      if (response.data.success) {
        const { role, username } = response.data;

        // Navigate based on user role
        if (role === 'host') {
          navigate(`/host-dashboard/${username}`);
        } else if (role === 'participant') {
          navigate(`/participant-dashboard/${username}`);
        }
      } else {
        alert(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Could not connect to server. Make sure backend is running.');
    }
  };

  const handleSignIn = () => {
    navigate('/account-choice');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="title">
          Welcome to <span className="dap-highlight">DAP</span>
        </h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Username or Email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <button className="signin-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
