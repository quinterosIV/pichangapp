const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const teamController = require('../controllers/teamController');

router.route('/usuario').post(userController.createUser);
router.route('/login').post(loginController.login);
router.route('/equipo').post(teamController.createTeam).put(teamController.calificar)

module.exports = router;
