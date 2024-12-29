const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  contactInfo: { type: String, required: true },
  shift: { type: String, required: true },
  performance: { type: String, required: true },
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
