const express = require('express');
const Request = require('../models/educationorder'); // افترض أن ملف الموديل موجود في هذا المسار

// إنشاء controller
const requestController = {
    // إنشاء طلب جديد
    createRequest: async (req, res) => {
        try {
            const { studentName, specialization, description } = req.body;
            
            // إنشاء طلب جديد باستخدام البيانات القادمة من العميل
            const newRequest = new Request({
                studentName,
                specialization,
                description
            });

            // حفظ الطلب في قاعدة البيانات
            await newRequest.save();

            res.status(201).json({ message: 'Request created successfully', request: newRequest });
        } catch (error) {
            res.status(500).json({ message: 'Error creating request', error });
        }
    },

    // جلب جميع الطلبات
    getRequests: async (req, res) => {
        try {
            const requests = await Request.find();
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching requests', error });
        }
    },

    // جلب طلب معين بواسطة ID
    getRequestById: async (req, res) => {
        try {
            const request = await Request.findById(req.params.id);
            if (!request) {
                return res.status(404).json({ message: 'Request not found' });
            }
            res.status(200).json(request);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching request', error });
        }
    },

    // تحديث طلب معين بواسطة ID
    updateRequest: async (req, res) => {
        try {
            const { studentName, specialization, description, status } = req.body;
            const updatedRequest = await Request.findByIdAndUpdate(
                req.params.id,
                { studentName, specialization, description, status },
                { new: true }
            );

            if (!updatedRequest) {
                return res.status(404).json({ message: 'Request not found' });
            }

            res.status(200).json({ message: 'Request updated successfully', request: updatedRequest });
        } catch (error) {
            res.status(500).json({ message: 'Error updating request', error });
        }
    },

    // حذف طلب معين بواسطة ID
    deleteRequest: async (req, res) => {
        try {
            const deletedRequest = await Request.findByIdAndDelete(req.params.id);

            if (!deletedRequest) {
                return res.status(404).json({ message: 'Request not found' });
            }

            res.status(200).json({ message: 'Request deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting request', error });
        }
    }
};

module.exports = requestController;
