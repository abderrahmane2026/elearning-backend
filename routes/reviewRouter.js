const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// مسار لإضافة رأي جديد
router.post('/', reviewController.addReview);

// مسار لاسترجاع جميع الآراء
router.get('/', reviewController.getAllReviews);

module.exports = router;
