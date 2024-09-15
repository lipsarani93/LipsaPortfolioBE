const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Call the sendEmail function
  const result = await sendEmail(name, email, message);

  if (result.status === 'success') {
      res.status(200).json(result);
  } else {
      res.status(500).json(result);
  }
});

module.exports = router;
