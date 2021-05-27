const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/').get(userController.login);
router.route('/').post(userController.signUp);

module.exports = router;
