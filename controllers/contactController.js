const Contact = require("../models/contactModel");

// submit a new contact message
const submitContact = async (req, res) => {
  try {
    const {name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
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
// delete a contact message
const deleteContactMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    await Contact.findByIdAndDelete(messageId);
    res.status(200).json({ message: "Contact message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitContact, getContactMessages,deleteContactMessage };
