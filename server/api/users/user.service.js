const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const pool = require('../../config/database');
const responseHandler = require('../helpers/helperFunction')
require("dotenv").config();

// constructor
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
};

User.register = async (newUser, result) => {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const query = `INSERT INTO registration(user_name,user_email,user_password,first_name,last_name) VALUES(?,?,?,?,?);`;

    pool.query(query,
        [newUser.username, newUser.email, newUser.password, newUser.firstname, newUser.lastname],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }

            const payload = {
                user: {
                    id: res.insertId
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) {
                        console.log('error: ', err);
                        result(
                            responseHandler(false, err.statusCode, err.message, null),
                            null
                        );
                        return;
                    }
                    result(
                        null,
                        responseHandler(true, 200, 'User registered', { 'token': token })
                    );
                });
        });
};

User.login = (newUser, result) => {
    const query = `SELECT * FROM registration WHERE user_email = ?;`;

    pool.query(query,
        newUser.email,
        async (err, results) => {
            if (err || !results[0]) {
                console.log('error: ', err);
                const code = !results[0] ? 404 : err.statusCode;
                result(
                    responseHandler(false, code, !results[0] ? 'User does not exists' : err.message, null),
                    null
                );
                return;
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(newUser.password, user.password);

            if (!isMatch) {
                result(
                    responseHandler(false, 400, 'Incorrect password', null),
                    null
                );
            }

            const payload = {
                user: {
                    id: user.user_id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) {
                        console.log('error: ', err);
                        result(
                            responseHandler(false, err.statusCode, err.message, null),
                            null
                        );
                        return;
                    }
                    result(
                        null,
                        responseHandler(true, 200, 'User logged in', { 'token': token })
                    );
                });
        });
};

User.retrieve = ({ action, id }, result) => {
    action = action.toLowerCase();
    const head = `  SELECT registration.user_id,registration.user_name, COUNT(DISTINCT questions.id)`;
    const middle = `FROM registration 
                    LEFT JOIN questions ON questions.user_id = registration.user_id 
                    LEFT JOIN posttag ON posttag.question_id = questions.id 
                    LEFT JOIN tags ON posttag.tag_id = tags.id`;

    const q1 = `as questions_count,COUNT(DISTINCT tagname) as tags_count  
                 ${middle} GROUP BY registration.user_id ORDER BY questions_count DESC;`;

    const q2 = `as question_count,COUNT(DISTINCT tagname) 
                as tag_count, COUNT(DISTINCT answers.id) 
                as answer_count, COUNT(DISTINCT comments.id) 
                as comment_count 
                 ${middle} LEFT JOIN answers ON answers.user_id = registration.user_id 
                LEFT JOIN comments ON comments.user_id = registration.user_id
                WHERE registration.user_id = ? GROUP BY registration.user_id;`

    pool.query(action === 'one' ? head + q2 : head + q1,
        action === 'one' ? id : null,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no users', null),
                    null
                );
                return;
            }
            result(
                null,
                responseHandler(true, 200, 'Success', action === 'one' ? results[0] : results)
            );
        });
}

User.loadUser = (user_id, result) => {
    const query = `SELECT user_id,user_name,user_email FROM registration WHERE user_id = ?;`;

    pool.query(query,
        user_id,
        (err, results) => {
            if (err) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err.statusCode, err.message, null),
                    null
                );
                return;
            }
            result(
                null,
                responseHandler(true, 200, 'Success', results[0])
            );
        });
}

module.exports = User;