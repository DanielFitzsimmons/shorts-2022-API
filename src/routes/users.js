const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/', usersController.postUser);
router.get('/me', auth, usersController.getUserByTokenId);

module.exports = router;