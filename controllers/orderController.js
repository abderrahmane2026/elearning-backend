const Order = require("../models/orderModel");

// submit a new order
const submitOrder = async (req, res) => {
  try {
    const { name, email, adress, phone, paymentMethod } = req.body;

    const order = new Order({
      name,
      email,
      Adress: adress,
      phoneNumber: phone,
      paymentMethod: paymentMethod,
    });

    await order.save();
    res.status(200).json({ message: "order submitted successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitOrder };
