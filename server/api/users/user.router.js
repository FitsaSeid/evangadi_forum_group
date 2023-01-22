const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkExistence = require('../middleware/checkExistence');
const {getUsers,register} = require('./user.controller');



router.get('/', getUsers);
router.get('/:id', getUsers);
router.post('/',
    [
        check('username', 'user name must be 5 or more charachter').isLength({ min: 5 }),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 8 or more characters'
        ).isLength({ min: 8 }), checkExistence
    ], register);

module.exports = router;