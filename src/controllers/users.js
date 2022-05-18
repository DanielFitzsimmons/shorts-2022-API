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

		user = new User(
			_.pick(req.body, ['firstName', 'lastName', 'email', 'password'])
		);
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		//File
		error = validateFile(req.files.avatar, 1000000, 'png')
		console.log(error);
		if (error) return res.status(400).send(error.error);
		const filePath = fileUploader(req.files.avatar, './uploads/avatars/', user.firstName + '_' + user.lastName);

		let newUser = new User({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			avatar: filePath
		})
		await newUser.save()
		console.log(user);
		const token = user.generateAuthToken();
		res.header("x-auth-token", token)
		let userData = _.pick(user, ['_id', 'firstName', 'lastName', 'email']);
		userData.token = token;
		res.send(userData);
	}
}