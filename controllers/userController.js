const multer = require("multer");
const User = require("../models/userModel");
const path = require("path");
const bcrypt = require("bcrypt");
const createToken = require("../middlewares/token");
const { default: mongoose } = require("mongoose");
const Cart = require("../models/cartModel");

// login function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password); // Use 'client' instead of 'user'
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken(user._id);

    res.json({ message: "logged in successfuly", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! multer upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// signup function
const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // const fileName = req.file.filename;
    // const basepath = ${req.protocol}://${req.get("host")}/public/images/;
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      // avatar: ${basepath}${fileName},
    });
    await user.save();

    const cart = new Cart({
      products: [],
      totalPrice: 0,
      clientID: user._id,
    });

    await cart.save();

    const token = createToken(user._id);

    res
      .status(200)
      .json({ message: "user created successfully", user, token, cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  const Users = await User.find();

  res.status(200).json(Users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such product" });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    res.status(404).json({ error: "no such product" });
  }

  res.status(200).json({ message: "User deleted successfuly" });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { userId } = req.params; // Use userId instead of id
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    // const userId = req.user._id; // Assuming req.user contains the authenticated user's details
    const { userId } = req.params;
    // Fetch the user from the database
    const user = await User.findById(userId);

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to update the extra info
const updateUserProfile = async (req, res) => {
  try {
    const { phoneNumber, address, dateOfBirth } = req.body;
    const userId = req.params.userId;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user profile fields
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    // If avatar is provided, update it
    if (req.file) {
      const avatarPath = req.file.path;
      user.avatar = avatarPath;
    }

    // Save updated user data
    await user.save();

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const acceptSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { sellerStatus: "accepted" },
      { new: true }
    );
    res.status(200).json({ message: "Seller request accepted", user });
  } catch (error) {
    console.error("Error accepting seller request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const refuseSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { sellerStatus: "refused" },
      { new: true }
    );
    res.status(200).json({ message: "Seller request refused", user });
  } catch (error) {
    console.error("Error refusing seller request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUsers,
  deleteUser,
  getUserById,
  updateProfile,
  updatePassword,
  upload,
  updateUserProfile,
  acceptSeller,
  refuseSeller,
};
