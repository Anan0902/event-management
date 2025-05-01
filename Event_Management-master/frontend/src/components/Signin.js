import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css'; // Make sure this file matches your updated royal blue theme
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'host',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/login', formData);
      alert(`Signed in as ${formData.role}`);
      navigate(`/${formData.role}/dashboard`);
    } catch (err) {
      console.error(err);
      alert('Sign In failed. Please check your credentials.');
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="signin-input"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="signin-input"
        />

        <label>Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="signin-select"
        >
          <option value="host">Host</option>
          <option value="participant">Participant</option>
        </select>

        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
