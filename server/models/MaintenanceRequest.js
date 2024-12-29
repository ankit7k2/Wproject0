const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true, default: 'Pending' },
  email: { type: String, required: true },
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
module.exports = MaintenanceRequest;
