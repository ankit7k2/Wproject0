const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, default: 'Pending' },
  email: { type: String, required: true },
});

const Fees = mongoose.model('Fees', feesSchema);
module.exports = Fees;
