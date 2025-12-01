const { login, signupUser, logout } = require( '../Controllers/authController');
const { signupvalidation, loginvalidation, logoutvalidation } = require('../middleware/auth');


const router = require('express').Router();


router.post('/sign-up',signupvalidation,signupUser);
router.post('/login',loginvalidation,login);
router.post('/logout',logoutvalidation,logout);

module.exports = router;