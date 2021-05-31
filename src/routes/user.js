const router = require('express').Router();
const { login, signUp, getLoggedUserInfo } = require('../controllers/user.controller');
const { auth } = require('../utils/auth');

router.route('/log').post(login);
router.route('/').post(signUp);
router.route('/info').get(auth, getLoggedUserInfo);

module.exports = router;
