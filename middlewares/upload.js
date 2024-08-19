const multer = require("multer");
const path = require("path");

// إعداد مكان التخزين
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// تهيئة Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // الحد الأقصى للحجم هو 10 ميجا
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// التحقق من نوع الملف
function checkFileType(file, cb) {
  // أنواع الملفات المسموح بها
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  // التحقق من امتداد الملف
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // التحقق من نوع MIME
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only images, PDFs, and Word documents are allowed!");
  }
}

module.exports = upload;
