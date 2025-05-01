import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  if (!role) return <p>No role selected. Please go back.</p>;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        ...formData,
        role,
      });

      if (response.data.success) {
        alert(`${role} registered successfully!`);
        navigate('/login');
      } else {
        alert(response.data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In as {role}</h2>

      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {/* You can add more role-specific fields here if needed */}

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInPage;
