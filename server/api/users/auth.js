
const responseHandler = require('../helpers/helperFunction')
const { validationResult } = require('express-validator');
const User = require('./user.service');

const loadUser = (req, res) => {
    try {
        User.loadUser(req.user.id, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(false, 500, 'Server Error', null));
    }
};

const login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
       
        User.login(new User(req.body), (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(responseHandler(true, 500, 'Server Error', null));
    }
};

module.exports = authController = {
    loadUser,
    login
};