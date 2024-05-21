//main vars
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  upload,
} = require("../controllers/productController");

// GET all the products
router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

// POST a new workout
router.post("/", upload.single("image"), createProduct);

// DELETE a workout
router.delete("/:id", deleteProduct);

// UPDATE a workout
router.patch("/:id", updateProduct);

module.exports = router;
