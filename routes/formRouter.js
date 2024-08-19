const express = require("express");
const router = express.Router();
const studentController = require("../controllers/formController");
const multer = require("multer");
const path = require("path");

// إعداد `multer` للتعامل مع رفع الملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/formcv/"); // الدليل الذي سيتم تخزين ملفات السيرة الذاتية فيه
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // اسم الملف مع إضافة تاريخ فريد
  },
});

const upload = multer({ storage: storage });

// المسارات

// إنشاء طالب جديد
router.post("/", upload.single("cv"), studentController.createStudent);

// الحصول على جميع الطلاب
router.get("/", studentController.getStudents);

// الحصول على طالب باستخدام المعرف
router.get("/:id", studentController.getStudentById);

// تحديث بيانات الطالب
router.put("/:id", upload.single("cv"), studentController.updateStudent);

// حذف طالب
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
