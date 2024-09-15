const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        // required: true,
        // unique: true,
    },
    description: {
        type: String,
        // required: true,
    },
    
   
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
