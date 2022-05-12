const { Category, validateCategory } = require('../models/category');

module.exports = {
	async getAllCategories(req, res) {
		const categories = await Category.find().sort('name');
		res.send(categories);
	},
	async postCategories(req, res) {
		const { error } = validateCategory(req.body);
		if (error) return res.status(400).send(error.details[0].message)
		let category = new Category({ name: req.body.name });
		category = await category.save();
		res.send(category);
	}
}
