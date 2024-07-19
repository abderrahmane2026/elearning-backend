const Order = require("../models/orderModel");

// Submit a new order
const submitOrder = async (req, res) => {
  try {
    const { name, email, address, phone, paymentMethod, sellerId,userId,duration, startTime, } = req.body;

    const order = new Order({
      name,
      email,
      Adress: address,
      phoneNumber: phone,
      paymentMethod,
      duration,
      startTime,
      userId,
      sellerId,
      
    });

    await order.save();
    res.status(200).json({ message: "Order submitted successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch orders by seller ID
const getOrdersBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const orders = await Order.find({ sellerId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch orders by user ID
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept order
const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    order.status = "accepted";
    await order.save();
    res.status(200).json({ message: "Order accepted successfully", status: order.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitOrder, getOrdersBySeller, deleteOrder, acceptOrder,getOrdersByUser };
