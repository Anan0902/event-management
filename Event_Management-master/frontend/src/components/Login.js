import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        emailOrUsername,
        password
      });

      if (res.data.success) {
        // Redirect to the appropriate dashboard
        if (res.data.role === 'host') {
          navigate(`/host-dashboard`);
        } else if (res.data.role === 'participant') {
          navigate(`/participant-dashboard`);
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
