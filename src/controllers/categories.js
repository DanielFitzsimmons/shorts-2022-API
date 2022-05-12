const { Category, validateCategory } = require('../models/category');

module.exports = {
	async getAllCategories(req, res) {
		const categories = await Category.find().sort('name');
		res.send(categories);
	},
	async getCategoriesById(req, res) {
		const category = await Category.findById(req.params.id);
		if (!category) return res.status(404).send("The category with the given ID was not found.");
		res.send(category);
	},
	async deleteCategoriesById(req, res) {
		const category = await Category.findByIdAndRemove(req.params.id);
		if (!category) return res.status(404).send("The category with the given ID was not found.");
		res.send(category);
	},
	async postCategories(req, res) {
		const { error } = validateCategory(req.body);
		if (error) return res.status(400).send(error.details[0].message)
		let category = new Category({ name: req.body.name });
		category = await category.save();
		res.send(category);
	},
	async putCategoriesById(req, res) {
		const { error } = validateCategory(req.body);
		if (error) return res.status(400).send(error.details[0].message)
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			{ name: req.body.name },
			{ new: true }
		);
		if (!category) return res.status(404).send("The category with the given ID was not found.");
		res.send(category);
	}
}
