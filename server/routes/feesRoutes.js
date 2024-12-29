const express = require('express');
const router = express.Router();
const Fee = require('../models/Fees');

router.get('/', async (req, res) => {
  try {
    const fees = await Fee.find();
    res.json(fees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { roomType, amount, dueDate, status } = req.body;
  try {
    const fee = new Fee({ roomType, amount, dueDate, status });
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(fee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
