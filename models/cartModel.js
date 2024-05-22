const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    require: true,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
