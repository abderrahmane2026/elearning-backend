const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  wilaya: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  educationLevel: {
    type: String,
    enum: ["دون مستوى", "ابتدائي", "متوسط", "ثانوي", "جامعي"],
    required: true,
  },
  specialization: {
    type: String,
  },
  thesisTitle: {
    type: String,
  },
  status: {
    type: String,
    enum: ["طالب جامعي", "موظف", "مؤسسة", "متمهن", "أستاذ/ة", "مواطن حر"],
    required: true,
  },
  institutionName: {
    type: String,
  },
  institutionAddress: {
    type: String,
  },
  cv: {
    type: String, // Store the path to the uploaded CV file
    required: true,
  },
});


const Student = mongoose.model("Student", studentSchema);


module.exports = Student;




