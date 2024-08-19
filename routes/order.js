const express = require("express");
const router = express.Router();
const {
  submitOrder,
  getOrdersBySeller,
  deleteOrder,
  acceptOrder,
  getOrdersByUser,
  getAllOrders,
  getAllCourseOrders,
  getAllCompanyOrders,
  getAllLectures,
  uploadcv, // استيراد `upload` من وحدة التحكم
} = require("../controllers/orderController");


router.post("/submit", uploadcv.single('cv'), submitOrder); // Submit a new order with CV upload
router.get("/seller/:sellerId", getOrdersBySeller); // Fetch orders by seller ID
router.put("/delete/:orderId", deleteOrder); // Delete order
router.put("/accept/:orderId", acceptOrder); // Accept order
router.get("/user/:userId", getOrdersByUser); // Fetch orders by user ID
router.get("/all", getAllOrders); // Fetch all orders
router.get("/course-orders", getAllCourseOrders); // Fetch all orders with category "Course"
router.get("/company-orders", getAllCompanyOrders); // Fetch all orders with category "Company"
router.get("/Lectures-orders", getAllLectures);// Fetch all orders with category "Lectures"

module.exports = router;
