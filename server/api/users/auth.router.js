const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { loadUser, login } = require('./auth')


router.get('/', auth, loadUser);
router.post(
    '/',
    [
        check('email', 'Email must be a valid email address').isEmail(),
        check(
            'password',
            'Password is required'
        ).not().isEmpty()
    ], login);

module.exports = router;