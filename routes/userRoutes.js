const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');

router.post('/user', async (req, res) => {
  try {
    console.log(req.body); // Log request body
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log('Validation failed');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Send email
    await sendEmail(email, 'Contact Form Message', `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    res.status(200).json({ message: 'Message received' });
  } catch (err) {
    console.error('Error processing contact request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
