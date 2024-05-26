const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  getUsers,
  upload,
  deleteUser,
  getUserById,
  updateProfile,
  updatePassword,
  updateUserProfile,
  acceptSeller,
  refuseSeller,
} = require("../controllers/userController");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", upload.single("avatar"), signupUser);

//get all the users
router.get("/", getUsers);

//get a single user
router.get("/:id", getUserById);

// delete a user
router.delete("/:id", deleteUser);

// updateProfile
router.put("/:userId/updateProfile", updateProfile);

// update Password
router.put("/:userId/updatePassword", updatePassword);

// add the extra info
router.put(
  "/:userId/updateUserProfile",
  upload.single("avatar"),
  updateUserProfile
);

// Route to accept seller request
router.put("/:id/accept", acceptSeller);

// Route to refuse seller request
router.put("/:id/refuse", refuseSeller);

module.exports = router;
