const express = require("express");
const router = express.Router();
const { submitOrder } = require("../controllers/orderController");

router.post("/submit", submitOrder);

module.exports = router;
