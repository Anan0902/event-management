import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

const SignupHost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizer: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/hosts/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        organizer: formData.organizer,
        address: formData.address
      });

      if (res.data.success) {
        alert('Host account created successfully');
        navigate(`/host-dashboard/${formData.username}`);
      } else {
        alert('Failed to register host');
      }
    } catch (error) {
      console.error('Error registering host:', error);
      const message = error.response?.data?.message || 'Server error while registering host';
      alert(message);
    }
    
  };

  return (
    <div className="signup-form-container">
      <h2>Host Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Host Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="organizer"
          placeholder="Organizer"
          value={formData.organizer}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignupHost;
