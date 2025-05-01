import React, { useState } from 'react';
import './AddEvent.css';

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    venue: '',
    link: '',
    description: '',
    attendanceCode: '',
    certificate: null,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEvent({ ...event, [name]: files[0] });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting event:", event);
    alert('Event uploaded successfully!');
    // You can use fetch/axios to send event data to backend here
  };

  return (
    <div className="add-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="add-event-form">
        <input type="file" name="photo" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Event Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="text" name="venue" placeholder="Venue (if offline)" onChange={handleChange} />
        <input type="text" name="link" placeholder="Online Link (if any)" onChange={handleChange} />
        <textarea name="description" placeholder="Event Description" onChange={handleChange} required />
        <input type="text" name="attendanceCode" placeholder="Attendance Code" onChange={handleChange} required />
        <input type="file" name="certificate" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEvent;
