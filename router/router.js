const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

router.route('/usuario').post(userController.createUser);
router.route('/login').post(loginController.login);

module.exports = router;