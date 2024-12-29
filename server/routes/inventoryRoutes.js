const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, category, quantity, status } = req.body;
  try {
    const item = new InventoryItem({ name, category, quantity, status });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
