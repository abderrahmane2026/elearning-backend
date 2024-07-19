const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cart: String,
  email: {
    type: String,
    required: true,
  },
  Adress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: String,
  sellerId: String,
  userId: String,
  duration:{
    type: String,
    required: true,
  },
  
  startTime:{
        type: String,
        required: true,
  },
 
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
