const mongoose = require('mongoose');
const Joi = require('joi');

//Model and Schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
})
const Category = mongoose.model('Categories', categorySchema);
//Joi Validation 
function validateCategory(category) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required()
	})
	return schema.validate(category);
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;