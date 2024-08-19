const mongoose = require('mongoose');

// Define the schema for the course
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,  // e.g., "3 months", "12 weeks"
    required: true
  },
  level: {
    type: String,  // e.g., "Beginner", "Intermediate", "Advanced"
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image:{
    type:String,
    required: true
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
