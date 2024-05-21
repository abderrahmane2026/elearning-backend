const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  upload,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser);

//login route
router.post("/signup", upload.single("avatar"), signupUser);

module.exports = router;
