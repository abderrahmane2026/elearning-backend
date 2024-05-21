// to use the .env file
require("dotenv").config();

// Main contants
const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// cors
app.use(cors({ origin: "*" }));

//just a test
const Product = require("./models/productModel");

// Serve static files from the 'public' directory
app.use("/public", express.static(path.join(__dirname, "public")));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

// connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
