const mongoose = require('mongoose');

// إنشاء مخطط (Schema) للرأي
const reviewSchema = new mongoose.Schema({
    name: {
        type: String, // اسم المستخدم الذي قدم الرأي
        required: true
    },
    rating: {
        type: Number, // تقييم الموقع من 1 إلى 5
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String, // نص الرأي
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // تاريخ تقديم الرأي
    }
});

// إنشاء النموذج (Model) بناءً على المخطط
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
