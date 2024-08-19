const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  cv: {
    type: String, // Store the path to the uploaded CV file
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
