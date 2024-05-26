const Contact = require("../models/contactModel");

// submit a new contact message
const submitContact = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const contact = new Contact({
      email,
      subject,
      message,
    });

    await contact.save();
    res.status(200).json({ message: "Contact message submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContactMessages = async (req, res) => {
  // await contactUs = Contact.find();

  // res.status(200).json(contactUs);

  const contact = await Contact.find();

  res.status(200).json(contact);
};
module.exports = { submitContact, getContactMessages };
