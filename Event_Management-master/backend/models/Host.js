import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizer: { type: String },
  address: { type: String }
});

const Host = mongoose.model('Host', HostSchema);
export default Host;
