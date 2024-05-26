//main vars
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsBySellerID,
  upload,
  refuseProduct,
  acceptProduct,
} = require("../controllers/productController");

// GET all the products
router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

//get a product based on the seller id
router.get("/seller/:sellerId", getProductsBySellerID);

// POST a new workout
router.post("/", upload.single("image"), createProduct);

// DELETE a workout
router.delete("/:id", deleteProduct);

// UPDATE a workout
router.patch("/:id", updateProduct);

router.put("/accept/:id", acceptProduct);

// refuse the product order
router.put("/refuse/:id", refuseProduct);

module.exports = router;
