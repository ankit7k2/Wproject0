const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: { type: String, required: true },
  occupancy: { type: String, required: true },
  status: { type: String, required: true },
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
