const Lecture = require('../models/Lecture'); // تأكد من أن المسار صحيح

// إنشاء محاضرة جديدة
const createLecture = async (req, res) => {
    try {
        const lecture = new Lecture(req.body);
        await lecture.save();
        res.status(201).json({ message: 'Lecture created successfully', lecture });
    } catch (error) {
        res.status(400).json({ message: 'Error creating lecture', error });
    }
};

// الحصول على جميع المحاضرات
const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find();
        res.status(200).json(lectures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lectures', error });
    }
};

// الحصول على محاضرة معينة بناءً على ID
const getLectureById = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }
        res.status(200).json(lecture);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lecture', error });
    }
};

// تحديث محاضرة
const updateLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }
        res.status(200).json({ message: 'Lecture updated successfully', lecture });
    } catch (error) {
        res.status(400).json({ message: 'Error updating lecture', error });
    }
};

// حذف محاضرة
const deleteLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findByIdAndDelete(req.params.id);
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }
        res.status(200).json({ message: 'Lecture deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lecture', error });
    }
};

module.exports = {
    createLecture,
    getLectures,
    getLectureById,
    updateLecture,
    deleteLecture,
};
