const express = require('express');
const Service = require('../models/ServiceModel');
const router = express.Router();

// Define the GET /services route
router.get('/services',async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ response: services });
  } catch (error) {
    console.error('Error getting data:', err);
    res.status(500).json({ message: 'Server error', Success: false });
  }
  
  
});

router.post('/services', async (req, res) => {
  try {
    const { id, title, description } = req.body;

    if (!id || !title || !description) {
      return res.status(400).json({ message: 'All fields are required', Success: false });
    }
    const newService = new Service(req.body);
    const response = await newService.save();
    console.log(response);

    
    res.status(200).json({ message: 'Message received', Success: true, response: response });
  } catch (err) {
    console.error('Error processing contact request:', err);
    res.status(500).json({ message: 'Server error', Success: false });
  }
});


module.exports = router;
