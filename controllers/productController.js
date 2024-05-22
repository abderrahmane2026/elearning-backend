const Product = require("../models/productModel");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// GET all products
const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
};

// GET a single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such Product" });
  }
  res.status(200).json(product);
};

//! multer upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// create a product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      review,
      company,
      category,
      sellerId,
    } = req.body;
    const fileName = req.file.filename;
    const basepath = `${req.protocol}://${req.get("host")}/public/images/`;

    // Create a new product instance
    const product = new Product({
      name,
      description,
      price,
      quantity,
      image: `${basepath}${fileName}`,
      review,
      company,
      category,
      sellerId,
    });

    // Save the product to the database
    await product.save();

    res.status(200).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Product" });
  }
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ error: "No such Product" });
  }

  res.status(200).json(product);
};

// Update a Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Product ID" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  upload,
};
