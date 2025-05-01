import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  mobile: String,
  college: String
});

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;
