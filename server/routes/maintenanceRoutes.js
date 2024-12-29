const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/MaintenanceRequest');

router.get('/', async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { description, status, email } = req.body;
  try {
    const request = new MaintenanceRequest({ description, status, email });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const request = await MaintenanceRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
