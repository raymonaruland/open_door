const express = require('express');
const router = express.Router();
const Items = require("../controllers/items.controller")

//Get All Items
router.get('/', Items.findAll);
//Get Single Items
router.get('/:id', Items.findById);
//Create a Items
router.post('/', Items.create);
//Update The Items
router.put('/:id', Items.update);
//Delete  The Items
router.delete('/:id', Items.delete);

module.exports = router


