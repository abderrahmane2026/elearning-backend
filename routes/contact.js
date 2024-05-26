const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContactMessages,
} = require("../controllers/contactController");

router.post("/submit", submitContact);

router.get("/", getContactMessages);

module.exports = router;
