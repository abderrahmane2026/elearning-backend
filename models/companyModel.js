const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true }, // اسم الشخص
    email: { type: String, required: true } // البريد الإلكتروني للشخص
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true }, // اسم الشركة
    address: { type: String, required: true }, // عنوان الشركة
    phone_number: { type: String, required: true }, // رقم الهاتف
    email: { type: String, required: true }, // البريد الإلكتروني للشركة
    price: { type: String, required: true }, // السعر
    detail: { type: String, required: true }, // التفاصيل
    image: { type: String }, // URL للصورة
    capacity: { type: Number, required: true }, // السعة (عدد الأشخاص)
    contracted: { type: Boolean, default: false }, // هل الشركة متعاقدة معنا أم لا
    people: [personSchema] // الأشخاص المرتبطين بالشركة
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
