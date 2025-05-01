import React from 'react';
import { Link } from 'react-router-dom';
import './HostDashboard.css';

const HostDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>DAP Host Dashboard</h1>
        <nav>
          <Link to="/host/home">Home</Link>
          <Link to="/host/add-event">Add Event</Link>
          <Link to="/host/registration-details">Registration Details</Link>
          <Link to="/host/event-details">Event Details</Link>
          <Link to="/">Logout</Link>
        </nav>
      </header>
      <main>
        <p>Welcome! Your events will show here.</p>
      </main>
    </div>
  );
};

export default HostDashboard;
