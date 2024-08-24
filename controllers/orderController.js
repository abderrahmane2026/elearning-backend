const Order = require("../models/orderModel");
const multer = require("multer");
const path = require("path");

// إعداد `multer` لتخزين الملفات في مجلد محدد
const storagecv = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cv/"); // تحديد مجلد التخزين
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // تسمية الملف
  },
});

const uploadcv = multer({ storage: storagecv });

// Submit a new order with CV upload
const submitOrder = async (req, res) => {
  try {
    const { name, email, address, phone, paymentMethod, catigory, userId, nameofchois ,} = req.body;
    const cvPath = req.file.path;

    const order = new Order({
      name,
      email,
      Adress: address,
      phoneNumber: phone,
      paymentMethod,
      userId,
      catigory,
      nameofchois,
      cv: cvPath, // إضافة مسار السيرة الذاتية إلى الطلب
    });

    await order.save();
    res.status(200).json({ message: "Order submitted successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders);
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

const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "accepted"; // تحديث حالة الطلب إلى "مقبول"
    await order.save();
    res.status(200).json({ message: "Order accepted successfully", status: order.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rejectedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "rejected"; // تحديث حالة الطلب إلى "مقبول"
    await order.save();
    res.status(200).json({ message: "Order rejected successfully", status: order.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch all orders with category "Course"
const getAllCourseOrders = async (req, res) => {
  try {
    const courseOrders = await Order.find({ catigory: "Course" });
    res.status(200).json(courseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all orders with category "company"
const getAllCompanyOrders = async (req, res) => {
  try {
    const courseOrders = await Order.find({ catigory: "company" });
    res.status(200).json(courseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all orders with category "Lectures"
const getAllLectures = async (req, res) => {
  try {
    const courseOrders = await Order.find({ catigory: "Lecture" });
    res.status(200).json(courseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { rejectedOrder,submitOrder, getOrdersBySeller, deleteOrder, acceptOrder, getOrdersByUser, getAllOrders, getAllCourseOrders, getAllCompanyOrders,getAllLectures, uploadcv };
