const express = require('express');
const courseController = require('../controllers/CourseController'); // تأكد من صحة المسار

const router = express.Router();

// مسار لإنشاء كورس جديد
router.post('/', courseController.createCourse);

// مسار لجلب جميع الكورسات
router.get('/', courseController.getAllCourses);

// مسار لجلب كورس واحد عن طريق ID
router.get('/:id', courseController.getCourseById);

// مسار لتحديث كورس معين عن طريق ID
router.put('/:id', courseController.updateCourse);

// مسار لحذف كورس معين عن طريق ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
