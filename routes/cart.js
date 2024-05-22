const express = require("express");
const router = express.Router();
const { addProduct } = require("../controllers/cartController");

// add new products to the cart
router.post("/:id/add", addProduct);

module.exports = router;
