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

  
  status: { type: String, default: "pending" },
  catigory: String,
  userId: String,
  nameofchois: String,
  
  cv: {
    type: String, // Store the path to the uploaded CV file
    required: true,
  }, // حقل جديد لحفظ مسار ملف السيرة الذاتية
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
