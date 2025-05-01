import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event:', error);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <div className="event-loading">Loading...</div>;
  if (!event) return <div className="event-not-found">Event not found</div>;

  return (
    <div className="event-details-container">
      <div className="event-card">
        <h2 className="event-title">{event.eventName}</h2>
        {event.photo && (
          <img
            src={`http://localhost:5001/uploads/${event.photo}`}
            alt={event.eventName}
            className="event-photo"
          />
        )}
        <p className="event-date"><strong>Date:</strong> {event.date}</p>
        <p className="event-venue"><strong>Venue:</strong> {event.venue}</p>
        <p className="event-description"><strong>Event Details:</strong>{event.description}</p>

        <button className="book-button">🎟️ Book Now</button>
        <button className="back-button" onClick={() => navigate(-1)}>← Back to Dashboard</button>
      </div>
    </div>
  );
};

export default EventDetails;
