const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.get('/', categoryController.getAllCategories)
router.post('/', categoryController.postCategories)

module.exports = router;