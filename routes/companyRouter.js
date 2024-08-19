const express = require('express');
const companyController = require('../controllers/companyController');


const router = express.Router();

// مسارات الشركات
router.post('/', companyController.addCompany);
router.delete('/:id', companyController.deleteCompany);
router.post('/:id/people', companyController.addPersonToCompany); 
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.get('/contracted', companyController.getContractedCompanies);

// مسارات الأشخاص


module.exports = router;
