const { Tree } = require('../models/tree');

module.exports = {
	async postTree(req, res) {
		let tree = new Tree({ name: req.body.name });
		result = await tree.save();
		res.send(result);
	}
}