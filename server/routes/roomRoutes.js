const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { number, type, occupancy, status } = req.body;
  try {
    const room = new Room({ number, type, occupancy, status });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
