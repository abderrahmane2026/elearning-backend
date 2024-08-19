const Company = require('../models/companyModel');
const Person = require('../models/userModel');

// إضافة شركة جديدة
exports.addCompany = async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).send(company);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// حذف شركة
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).send("Company not found");
        }
        res.send("Company deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// Function to add a person to a company
exports.addPersonToCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { name, email } = req.body;

        // Find the company by ID
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Create a new person object
        const newPerson = { name, email };

        // Add the person to the company's people array
        company.people.push(newPerson);

        // Save the updated company document
        await company.save();

        return res.status(200).json({ message: 'Person added successfully', company });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
// استدعاء كل الشركات
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('people');
        res.send(companies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// استدعاء شركة واحدة حسب الـ ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('people');
        if (!company) {
            return res.status(404).send("Company not found");
        }
        res.send(company);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// companyController.js
exports.getContractedCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ contracted: true });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contracted companies' });
    }
};

