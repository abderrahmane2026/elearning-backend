const express = require('express');
const router = express.Router();
const requestController = require('../controllers/educationorder'); // افترض أن ملف الكنترولر موجود في هذا المسار

// إنشاء المسارات وربطها بوظائف الكنترولر

// إنشاء طلب جديد
router.post('/', requestController.createRequest);

// جلب جميع الطلبات
router.get('/', requestController.getRequests);

// جلب طلب معين بواسطة ID
router.get('/:id', requestController.getRequestById);

// تحديث طلب معين بواسطة ID
router.put('/:id', requestController.updateRequest);

// حذف طلب معين بواسطة ID
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
