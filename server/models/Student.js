const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactInfo: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  studentId: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  attendance: { type: Array, default: [] },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
