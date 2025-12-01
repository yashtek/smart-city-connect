const { login, signupUser } = require( '../Controllers/authController');
const { signupvalidation, loginvalidation } = require('../middleware/auth');


const router = require('express').Router();


router.post('/sign-up',signupvalidation,signupUser);
router.post('/login',loginvalidation,login);

module.exports = router;