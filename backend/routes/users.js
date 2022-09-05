const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');

router.get('/', controllers.getUserById);
router.put('/', controllers.updateUser);

module.exports = router;