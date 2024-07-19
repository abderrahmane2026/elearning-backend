const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: String,
  address: String,
  avatar: String,
  dateOfBirth: Date,
  role: String,
  sellerStatus: {
    type: String,
    default: "requested",
  },
});


module.exports = mongoose.model("User", userSchema);
