const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// POST /api/participants/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, mobile, college } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newParticipant = new Participant({
      username,
      email,
      password,
      firstName,
      lastName,
      mobile,
      college
    });

    await newParticipant.save();

    res.status(201).json({ message: 'Participant registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ message: `${field} already exists` });
    }

    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/participants/book
router.post('/book', async (req, res) => {
  try {
    const { eventId, participantId } = req.body;

    if (!eventId || !participantId) {
      return res.status(400).json({ message: 'Missing event or participant ID' });
    }

    const existingBooking = await Booking.findOne({ event: eventId, participant: participantId });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }

    const newBooking = new Booking({ event: eventId, participant: participantId });
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Booking failed' });
  }
});

// GET /api/participants/:participantId/bookings
router.get('/:participantId/bookings', async (req, res) => {
  try {
    const { participantId } = req.params;
    const bookings = await Booking.find({ participant: participantId }).populate('event');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

module.exports = router;
