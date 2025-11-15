require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/feedback', feedbackRoutes);

// health
app.get('/', (req, res) => res.send('Feedback API is running'));

// connect to mongo and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI. Create a .env from .env.example and set MONGO_URI (URL-encode special chars, e.g. @ -> %40).');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });