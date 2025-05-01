import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ParticipantDashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParticipantDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [events, setEvents] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events', err);
      toast.error('Failed to load events. Please try again.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const bookings = [
    { event: 'Tech Summit 2025', status: 'Confirmed' },
    { event: 'Design Con', status: 'Pending' },
  ];

  const renderDashboard = () => (
    <div className="dashboard-content">
      <h2>Welcome, {username}!</h2>
      <h3>Available Events</h3>
      <button className="refresh-button" onClick={fetchEvents}>
        🔄 Refresh Events
      </button>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} className="event-card">
              {event.photo && (
                <img
                  src={`http://localhost:5001/uploads/${event.photo}`}
                  alt={event.eventName}
                  className="event-image"
                />
              )}
              <h3>{event.eventName}</h3>
              <p>{event.date} | {event.venue}</p>
              <p>{event.description}</p>
              <button className="view-button" onClick={() => navigate(`/event/${event._id}`)}>
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderBookings = () => (
    <div className="bookings-content">
      <h2>Your Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Status</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.event}</td>
              <td>{booking.status}</td>
              <td>
                <button className="review-button">⭐ Rate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="participant-dashboard">
      <div className="top-navbar">
        <div className="company-name">DAP</div>
        <div className="nav-buttons">
          <button
            className={activePage === 'dashboard' ? 'active' : ''}
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activePage === 'bookings' ? 'active' : ''}
            onClick={() => setActivePage('bookings')}
          >
            Bookings
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-body">
        {activePage === 'dashboard' ? renderDashboard() : renderBookings()}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ParticipantDashboard;
