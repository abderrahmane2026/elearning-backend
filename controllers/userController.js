const multer = require("multer");
const User = require("../models/userModel");
const path = require("path");
const bcrypt = require("bcrypt");
const createToken = require("../middlewares/token");

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

    res.json({ message: "logged in successfuly", token });
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
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // const fileName = req.file.filename;
    // const basepath = `${req.protocol}://${req.get("host")}/public/images/`;
    const user = new User({
      name,
      email,
      password: hashedPassword,
      // avatar: `${basepath}${fileName}`,
    });
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ message: "user created successfully", user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  upload,
};
