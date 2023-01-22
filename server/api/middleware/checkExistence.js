const pool = require('../../config/database');
const responseHandler = require('../helpers/helperFunction')


module.exports = (req, res, next) => {
    const { email } = req.body;

    pool.query(`SELECT * FROM registration WHERE user_email = ?;`, email, (err, results) => {
        if (err) {
            return res
                .status(err.statusCode)
                .json(responseHandler(false, err.statusCode, err.message, null));
        }
        if (results[0]) {
            return res
                .status(400)
                .json(responseHandler(false, 400, 'User already exists', null));
        }
        next();
    });
}