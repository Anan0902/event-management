import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [role, setRole] = useState('participant');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        emailOrUsername,
        password,
      });

      if (res.data.success) {
        alert('Login successful!');

        if (res.data.role === 'participant') {
          navigate('/participant-dashboard');
        } else {
          navigate('/host-dashboard');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In to DAP</h2>
      <div className="role-toggle">
        <button onClick={() => setRole('participant')} className={role === 'participant' ? 'active' : ''}>Participant</button>
        <button onClick={() => setRole('host')} className={role === 'host' ? 'active' : ''}>Host</button>
      </div>

      <form className="form" onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username or Email" 
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
