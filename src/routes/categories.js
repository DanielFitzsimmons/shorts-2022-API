const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoriesById)
router.post('/', categoryController.postCategories)
router.delete('/:id', categoryController.deleteCategoriesById)
router.put('/:id', categoryController.putCategoriesById)

module.exports = router;