const mongoose = require('mongoose');

// إنشاء Schema للطلب
const RequestSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});

// إنشاء Model للطلب
const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
