import express from 'express';
import bcrypt from 'bcrypt';
import Host from '../models/Host.js';
import Participant from '../models/Participant.js';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ success: false, message: 'Missing credentials' });
    }

    let user = await Host.findOne({ 
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }] 
    });
    let role = 'host';

    if (!user) {
      user = await Participant.findOne({ 
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }] 
      });
      role = 'participant';
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    return res.status(200).json({ 
      success: true, 
      role,
      username: user.username
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { role, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === 'host') {
      newUser = new Host({ username, email, password: hashedPassword });
    } else {
      newUser = new Participant({ username, email, password: hashedPassword });
    }

    await newUser.save();
    res.status(201).json({ success: true, message: `${role} registered successfully` });

  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const fieldMessage = duplicateField === 'email'
        ? 'Email is already registered.'
        : 'Username is already taken.';

      return res.status(400).json({
        success: false,
        message: fieldMessage,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Signup failed',
      error: error.message,
    });
  }
});

export default router;
