const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const corsOption ={origin:['http://localhost:5173','https://lipsa-portfolio.vercel.app' ]}
app.use(cors(corsOption));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('This is an open route. Anyone can access this.');
});

// Define routes
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/serviceRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/subscriber'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
