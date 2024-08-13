require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000; 

// Check for MongoDB URI
if (!dbURI) {
  console.error('Missing MONGODB_URI in environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/studentRoutes'));
app.use('/api', require('./routes/busRoutes'));
app.use('/api', require('./routes/allocationRoutes'));




// Serve static files from the React app (comment out this line for now)
// app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all handler to serve the React app (comment out this line for now)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
