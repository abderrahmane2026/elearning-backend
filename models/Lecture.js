const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
});

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['ابتدائي', 'متوسط', 'ثانوي', 'جامعي'],
        required: true,
    },
    details: {
        type: String,
    },
    lecturers: [lecturerSchema],
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
