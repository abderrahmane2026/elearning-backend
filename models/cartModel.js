const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [
    {
      productID: String,
      quantity: {
        type: Number,
        min: 1,
      },
    },
  ],
  totalPrice: Number,
  clientID: String,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
