// routes/subscriber.js
const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const nodemailer = require('nodemailer');

// POST /api/subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      // console.log("dimag kaam nahi kar raha");
      return res.status(400).json({ msg: 'Email is already subscribed' });
      
    }

    // Save the new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(200).json({ msg: 'Successfully subscribed' });
    // console.log("dimag kaam nahi kar raha");
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }

  
});
// routes/subscriber.js


// POST /api/send-email
router.post('/send-email', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({});
    const emailList = subscribers.map(sub => sub.email);

    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or any other email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailList, // array of recipients
      subject: 'Your Subject',
      text: 'Your Email Content',
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
