const express = require('express');
const router = express.Router();
const projects = require("../controllers/projects.controller")

//Get All Projects
router.get('/', projects.findAll);
//Get Single Project
router.get('/:id', projects.findById);
//Create a Project
router.post('/', projects.create);
//Update The Project
router.put('/:id', projects.update);
//Delete  The Project
router.delete('/:id', projects.delete);

module.exports = router


