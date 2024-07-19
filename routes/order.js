const express = require("express");
const router = express.Router();
const { submitOrder, getOrdersBySeller, deleteOrder, acceptOrder,getOrdersByUser } = require("../controllers/orderController");

router.post("/submit", submitOrder);
router.get("/seller/:sellerId", getOrdersBySeller); // Fetch orders by seller ID
router.put("/delete/:orderId", deleteOrder); // Delete order
router.put("/accept/:orderId", acceptOrder); // Accept order
router.get("/user/:userId", getOrdersByUser); // Fetch orders by user ID
module.exports = router;
