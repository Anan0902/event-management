import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddEvent from './AddEvent';
import './HostDashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HostDashboard = () => {
  const { username } = useParams();
  const [activeSection, setActiveSection] = useState('home');
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === 'home' && username) {
      fetchEvents();
    }
  }, [activeSection, username]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5001/api/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
        toast.success('✅ Event deleted successfully!');
      } catch (error) {
        console.error('❌ Failed to delete event:', error);
        toast.error('❌ Failed to delete event.');
      }
    }
  };

  const handleEdit = (eventData) => {
    navigate(`/host-dashboard/${username}/edit/${eventData._id}`);
  };

  return (
    <div className="host-dashboard-container">
      <div className="host-topbar">
        <div className="host-logo">DAP - Welcome {username}</div>
        <div className="host-nav">
          <button onClick={() => setActiveSection('home')}>Home</button>
          <button onClick={() => setActiveSection('add')}>Add Events</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="host-dashboard-content">
        {activeSection === 'home' && (
          <div className="host-home">
            {events.length === 0 ? (
              <p>No events created yet.</p>
            ) : (
              events.map(event => (
                <div key={event._id} className="event-card">
                  {event.photo && (
                    <img
                      src={`http://localhost:5001/uploads/${event.photo}`}
                      alt="Event"
                      className="event-img"
                    />
                  )}
                  <h3>{event.eventName}</h3>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p>{event.description}</p>
                  <div className="event-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'add' && <AddEvent />}
      </div>

      {/* ✅ Toast notifications container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default HostDashboard;
