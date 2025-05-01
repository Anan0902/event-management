// ... import section remains the same
import React, { useState } from 'react';
import './AddEvent.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    venue: '',
    description: '',
    attendance: false,
  });

  const [photo, setPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCertificateChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { eventName, date, venue, description } = formData;

    if (!eventName || !date || !venue || !description || !photo) {
      toast.error("Please fill all required fields and upload a photo.");
      return;
    }
    

    const data = new FormData();
    data.append('photo', photo);
    if (certificate) data.append('certificate', certificate); // Only append if present
    data.append('eventName', eventName);
    data.append('date', date);
    data.append('venue', venue);
    data.append('description', description);
    data.append('attendance', formData.attendance);

    try {
      await axios.post('http://localhost:5001/api/events/add-event', data);
      toast.success('🎉 Event added successfully!');
      setFormData({
        eventName: '',
        date: '',
        venue: '',
        description: '',
        attendance: false
      });
      setPhoto(null);
      setCertificate(null);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add event. Try again!');
    }
  };

  return (
    <>
      <motion.form
        className="add-event-form wide-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Add Event</h2>

        <div className="form-row">
          <label>Event Name:</label>
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>
            Venue/Link: <span className="hint-text">(Address or Map for offline / Meeting link for online)</span>
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="e.g. 123 Main Street OR Google Maps link OR Zoom/Meet link"
            required
          />
        </div>

        <div className="form-row">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required />
        </div>

        <div className="form-row">
          <label>Photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} required />
        </div>

        {photo && (
          <div className="photo-preview">
            <img src={URL.createObjectURL(photo)} alt="Preview" />
          </div>
        )}

        <div className="form-row">
          <label>Sample Certificate (PDF): <span style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>(optional)</span></label>
          <input type="file" accept="application/pdf" onChange={handleCertificateChange} />
        </div>

        <div className="form-row checkbox-inline">
          <input
            type="checkbox"
            name="attendance"
            checked={formData.attendance}
            onChange={handleChange}
            id="attendance-checkbox"
          />
          <label htmlFor="attendance-checkbox" className="inline-label">Enable Manual Attendance</label>
        </div>

        <button type="submit">Add Event</button>
      </motion.form>

      <ToastContainer position="top-center" autoClose={5001} />
    </>
  );
};

export default AddEvent;
