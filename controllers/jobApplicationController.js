const JobApplication = require('../models/JobApplication');

const submitJobApplication = async (req, res) => {
  try {
    const { name, surname, phone, email, specialization } = req.body;
    const cv = req.file.path;

    const jobApplication = new JobApplication({
      name,
      surname,
      phone,
      email,
      specialization,
      cv,
    });

    await jobApplication.save();
    res.status(201).json({ message: "Job application submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

const getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

module.exports = {
  submitJobApplication,
  getAllJobApplications,
};
