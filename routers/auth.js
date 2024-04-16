const express = require('express');
const { register, registerMember, userLogin, validateUser, validateMember, memberLogin } = require('../controller/auth');
const router = express.Router();

router.post('/register-user', register);
router.post('/login-user', userLogin);
router.post('/validate-user', validateUser);

module.exports = router;