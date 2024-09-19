const Student = require("../models/formModel");

// إنشاء طالب جديد
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student({
      fullName: req.body.fullName,
      wilaya: req.body.wilaya,
      registrationNumber: req.body.registrationNumber,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      educationLevel: req.body.educationLevel,
      specialization: req.body.specialization,
      thesisTitle: req.body.thesisTitle,
      status: req.body.status,
      institutionName: req.body.institutionName,
      institutionAddress: req.body.institutionAddress,
      userId:req.body.userId,
      companyName:req.body.companyName,
      cv: req.file.path, // تخزين مسار ملف السيرة الذاتية
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// الحصول على قائمة الطلاب
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// الحصول على طالب معين باستخدام معرفه
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تحديث بيانات الطالب
exports.updateStudent = async (req, res) => {
  try {
    const updatedData = {
      fullName: req.body.fullName,
      wilaya: req.body.wilaya,
      registrationNumber: req.body.registrationNumber,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      educationLevel: req.body.educationLevel,
      specialization: req.body.specialization,
      thesisTitle: req.body.thesisTitle,
      status: req.body.status,
      institutionName: req.body.institutionName,
      institutionAddress: req.body.institutionAddress,
    };

    if (req.file) {
      updatedData.cv = req.file.path; // تحديث مسار ملف السيرة الذاتية إذا تم رفع ملف جديد
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// حذف طالب
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
