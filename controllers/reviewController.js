const Review = require('../models/review'); // افتراض أن النموذج (model) موجود في مجلد models

// إضافة رأي جديد
exports.addReview = async (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        // التحقق من إدخال جميع الحقول المطلوبة
        if (!name || !rating || !comment) {
            return res.status(400).json({ message: 'الرجاء إدخال جميع الحقول المطلوبة.' });
        }

        // إنشاء رأي جديد
        const newReview = new Review({
            name,
            rating,
            comment
        });

        // حفظ الرأي في قاعدة البيانات
        await newReview.save();

        res.status(201).json({ message: 'تمت إضافة الرأي بنجاح.', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء إضافة الرأي.', error: error.message });
    }
};

// استرجاع جميع الآراء
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find(); // استرجاع جميع الآراء من قاعدة البيانات
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ أثناء استرجاع الآراء.', error: error.message });
    }
};
