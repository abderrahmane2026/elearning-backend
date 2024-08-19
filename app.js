require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// مسارات الملفات المختلفة
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const contactRoutes = require("./routes/contact");
const companyRoutes = require("./routes/companyRouter");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const CourseRouter = require("./routes/CourseRouter");
const formRoutes = require("./routes/formRouter");
const lectureRoutes = require("./routes/LectureRouter");
const reviewRoutes = require('./routes/reviewRouter');
const educationorder = require('./routes/educationorder');

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// تقديم الملفات الثابتة من مجلد 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

// تفعيل المسارات
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/job-application', jobApplicationRoutes);
app.use('/api/courses', CourseRouter);

app.use("/api/form", formRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/educationorder", educationorder);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database  ");
    app.listen(process.env.PORT, () => {
      console.log("Listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
