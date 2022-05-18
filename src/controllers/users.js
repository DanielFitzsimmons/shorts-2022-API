const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { fileUploader, validateFile } = require('../util/fileUploader');

module.exports = {
	async postUser(req, res) {
		console.log(req.body);
		console.log(req.file);
		let { error } = validateUser(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send('User already registered.');

		const salt = await bcrypt.genSalt(10);
		let password = await bcrypt.hash(req.body.password, salt);

		//File
		error = validateFile(req.files.avatar, 1000000, 'png')
		console.log(error);
		if (error) return res.status(400).send(error.error);
		const filePath = fileUploader(req.files.avatar, './uploads/avatars/', req.body.firstName + '_' + req.body.lastName);

		let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: password,
			avatar: filePath
		})
		await newUser.save()
		console.log(newUser);
		const token = newUser.generateAuthToken();
		res.header("x-auth-token", token)
		let userData = _.pick(newUser, ['_id', 'firstName', 'lastName', 'email']);
		userData.token = token;
		res.send(userData);
	},
	async getUserByTokenId(req, res) {
		console.log(req.user);
		const user = await User.findById(req.user._id)
		console.log(user);
		res.send(user);
	}
}