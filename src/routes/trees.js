const express = require('express');
const router = express.Router();
const treeController = require('../controllers/trees');

router.post('/', treeController.postTree);

module.exports = router;