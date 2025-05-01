const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Setup multer storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const isValid = fileTypes.test(file.mimetype) && fileTypes.test(file.originalname.split('.').pop());
    cb(isValid ? null : new Error('Invalid file type'), isValid);
  }
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]);

// ✅ GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// ✅ GET event by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid event ID format' });
  }

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST: Add new event
router.post('/add-event', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'File upload failed', details: err.message });
    next();
  });
}, async (req, res) => {
  try {
    const { eventName, date, venue, description, attendance } = req.body;

    if (!eventName || !date || !venue || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const photo = req.files?.['photo']?.[0]?.filename || null;
    const certificate = req.files?.['certificate']?.[0]?.filename || null;

    const newEvent = new Event({
      eventName,
      date,
      venue,
      description,
      attendance: attendance === 'true',
      photo,
      certificateSample: certificate
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', newEvent });
  } catch (err) {
    console.error('Event Save Error:', err);
    res.status(500).json({ error: 'Failed to add event', details: err.message });
  }
});

// ✅ PUT: Update an event by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid event ID format' });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (err) {
    console.error('Error updating event:', err.message);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

module.exports = router;
// ✅ DELETE: Delete event by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid event ID format' });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err.message);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});
