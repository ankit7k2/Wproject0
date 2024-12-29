const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, role, contactInfo, responsibilities } = req.body;
  try {
    const admin = new Admin({ name, role, contactInfo, responsibilities });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
