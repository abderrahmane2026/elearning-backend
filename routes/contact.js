const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContactMessages,
  deleteContactMessage
} = require("../controllers/contactController");


router.post("/submit", submitContact);

router.get("/", getContactMessages);
router.delete("/delete/:messageId", deleteContactMessage); // Delete contact message
module.exports = router;
