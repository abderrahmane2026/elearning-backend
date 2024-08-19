const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // تأكد من مسار ملف upload
const {
  loginUser,
  signupUser,
  getUsers,
  deleteUser,
  getUserById,
  updateProfile,
  updatePassword,
  updateUserProfile,
  acceptMr,
  refuseMr,
  getCurrentUser,
  
} = require("../controllers/userController");

// مسار تسجيل الدخول
router.post("/login", loginUser);

// مسار التسجيل
router.post("/signup", upload.single("avatar"), signupUser);

// الحصول على جميع المستخدمين
router.get("/", getUsers);

// الحصول على مستخدم واحد
router.get("/:id", getUserById);

// حذف مستخدم
router.delete("/:id", deleteUser);

// تحديث الملف الشخصي
router.put("/:userId/updateProfile", updateProfile);

// تحديث كلمة المرور
router.put("/:userId/updatePassword", updatePassword);

// تحديث المعلومات الإضافية
router.put("/:userId/updateUserProfile", upload.single("avatar"), updateUserProfile);

// قبول طلب البائع
router.put("/:id/accept", acceptMr);

// رفض طلب البائع
router.put("/:id/refuse", refuseMr);

router.get("/current",  getCurrentUser);

module.exports = router;
