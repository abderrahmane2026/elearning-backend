const express = require("express");
const router = express.Router();
const {
  addProduct,
  getCart,
  clearCart,
} = require("../controllers/cartController");

// Add new products to the cart
router.post("/:clientId/add/:productId", addProduct);

// Get cart for a specific client
router.get("/:clientId", getCart);

// Clear the cart
router.post("/:clientId/clear", clearCart);

module.exports = router;
