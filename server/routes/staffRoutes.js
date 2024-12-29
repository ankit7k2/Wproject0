const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, role, contactInfo, shift, performance } = req.body;
  try {
    const staff = new Staff({ name, role, contactInfo, shift, performance });
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
