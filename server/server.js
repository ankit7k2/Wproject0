const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const sgMail = require('@sendgrid/mail');
const InventoryItem = require('./models/InventoryItem');

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/fees', require('./routes/feesRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Schedule automated reminders
cron.schedule('0 9 * * *', async () => {
  try {
    const items = await InventoryItem.find({ status: 'Out of Stock' });
    items.forEach(async (item) => {
      const msg = {
        to: 'admin@example.com',
        from: 'your_email@example.com',
        subject: 'Inventory Alert',
        text: `The item "${item.name}" is out of stock. Please restock it as soon as possible.`,
      };
      await sgMail.send(msg);
      console.log(`Alert sent for item: ${item.name}`);
    });
  } catch (error) {
    console.error('Error sending alerts:', error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
