import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditEventForm.css';

const EditEventForm = () => {
  const { eventId, username } = useParams();
  const navigate = useNavigate();

  console.log("Username from URL:", username);

  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    venue: '',
    description: ''
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/events/${eventId}`);
        setInitialData(res.data);
        setFormData({
          eventName: res.data.eventName || '',
          date: res.data.date?.substring(0, 10) || '',
          venue: res.data.venue || '',
          description: res.data.description || ''
        });
      } catch (err) {
        console.error('Error fetching event data:', err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!initialData) return;

    const updatedFields = {};
    Object.keys(formData).forEach((key) => {
      const current = formData[key] ?? '';
      const original = initialData[key] ?? '';
      if (String(current).trim() !== String(original).trim()) {
        updatedFields[key] = current;
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      alert('No changes detected.');
      return;
    }

    try {
      await axios.put(`http://localhost:5001/api/events/${eventId}`, updatedFields);
      console.log('Successfully updated event');
      navigate(`/host-dashboard/${username}`);
    } catch (err) {
      console.error('Error updating event:', err.response?.data || err.message);
    }
  };

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="edit-event-form">
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Venue"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        ></textarea>
        <button type="submit" className="save-btn">💾 Save Changes</button>
      </form>

      {showToast && <div className="success-toast">✅ Event updated successfully!</div>}
    </div>
  );
};

export default EditEventForm;
