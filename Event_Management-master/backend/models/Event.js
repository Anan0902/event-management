const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  attendance: { type: Boolean, default: false },
  certificateSample: { type: String, default: null },
  photo: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
