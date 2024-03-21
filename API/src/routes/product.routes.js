const express = require('express');
const router = express.Router();
const Product = require("../controllers/product.controller")

//Get dashboard report count
router.get('/dashboard_report_count', Product.DashboardReportCount);
//Get Single Project
router.get('/:id', Product.findById);
//Update The Project
router.put('/:id', Product.update);
//Delete  The Project
router.delete('/:id', Product.delete);
//Create a Project
router.post('/', Product.create);
//Get All Projects
router.get('/', Product.findAll);

module.exports = router


