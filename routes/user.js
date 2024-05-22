const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  getUsers,
  upload,
  deleteUser,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", upload.single("avatar"), signupUser);

//get all the users
router.get("/", getUsers);

// delete a user
router.delete("/:id", deleteUser);

module.exports = router;
