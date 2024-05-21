const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image: String,
    review: String,
    company: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
