const express = require('express');
const router = express.Router();
const Host = require('../models/Host');

router.post('/register', async (req, res) => {
  try {
    console.log('Received host data:', req.body);
    const { username, email, password, organizer, address } = req.body;

    const newHost = new Host({ username, email, password, organizer, address });
    await newHost.save();

    res.status(201).json({ success: true, message: 'Host registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ success: false, message: `${field} already exists` });
    }

    console.error('Error saving host:', error);
    res.status(500).json({ success: false, message: 'Error registering host' });
  }
});

module.exports = router;
