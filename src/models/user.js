const config = require('config');
const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	lastName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	avatar: {
		type: String,
		required: true,
	},
	isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

userSchema.method.generateAuthToken = function () {
	const token = jwt.sign({
		_id: this.id, firstName: this.firstName, lastName: this.lastName,
		email: this.email, isAdmin: this.isAdmin
	}, config.get('shortPrivateKey'));
	return token;
}

function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().min(3).max(50).required(),
		lastName: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	})
	return schema.validate(user);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;