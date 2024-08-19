const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/LectureController');

// إنشاء محاضرة جديدة
router.post('/', lectureController.createLecture);

// الحصول على جميع المحاضرات
router.get('/', lectureController.getLectures);

// الحصول على محاضرة معينة
router.get('/:id', lectureController.getLectureById);

// تحديث محاضرة
router.put('/:id', lectureController.updateLecture);

// حذف محاضرة
router.delete('/:id', lectureController.deleteLecture);

module.exports = router;
