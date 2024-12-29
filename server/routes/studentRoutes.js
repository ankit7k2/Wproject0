const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, age, gender, contactInfo, course, year, studentId, emergencyContact, attendance } = req.body;
  try {
    const student = new Student({ name, age, gender, contactInfo, course, year, studentId, emergencyContact, attendance });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
