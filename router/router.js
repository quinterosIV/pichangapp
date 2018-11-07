const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const teamController = require('../controllers/teamController');
const matchController = require('../controllers/matchController');

router.route('/usuario').post(userController.createUser);
router.route('/usuario').post(userController.getUsers);
router.route('/usuario/add').put(userController.addFriend);
router.route('/listFriends').get(userController.listFriends);
router.route('/login').post(loginController.login);
router.route('/equipo').post(teamController.createTeam);
router.route('/calificar').put(teamController.calificar);
router.route('/:username/crearpartido').post(matchController.createMatch);


module.exports = router;
