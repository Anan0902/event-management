import React, { useState } from 'react';
import './EventDetails.css';

const dummyEvents = [
  {
    id: 1,
    name: "TechCon 2025",
    date: "2025-05-10",
    venue: "Online",
    description: "A grand conference on emerging tech",
  },
  {
    id: 2,
    name: "Design Fest",
    date: "2025-06-15",
    venue: "Auditorium Hall B",
    description: "Showcase of modern UI/UX designs",
  },
];

const EventDetails = () => {
  const [events, setEvents] = useState(dummyEvents);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
      alert("Event deleted successfully.");
    }
  };

  const handleEdit = (event) => {
    alert(`Edit form for "${event.name}" (you can replace this with a modal or edit form)`);
  };

  return (
    <div className="event-details-container">
      <h2>Event Details</h2>
      {events.map((event) => (
        <div className="event-card" key={event.id}>
          <h3>{event.name}</h3>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <div className="event-buttons">
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventDetails;
