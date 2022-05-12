const mongoose = require('mongoose');


//Model and Schema
const treeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
})
const Tree = mongoose.model('Trees', treeSchema);

module.exports.Tree = Tree;