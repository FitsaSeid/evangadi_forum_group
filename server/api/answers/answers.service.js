const pool = require('../../config/database');
const responseHandler = require('../helpers/helperFunction')


//constractor
const Answer = function (answer) {
    this.answer = answer.body;
    this.user_id = answer.user_id;
    this.question_id = answer.question_id;
};

//create
Answer.create = (newAnswer, result) => {
    const query = `INSERT INTO answers(answer,user_id,question_id) VALUES(?,?,?);`;

    pool.query(
        query,
        [newAnswer.answer, newAnswer.user_id, newAnswer.question_id],
        (err, res) => {
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
                responseHandler(true, 200, 'Answer Added', res.insertId)
            );
        });
};

//remove

Answer.remove = (id, result) => {
    const query = ` DELETE FROM answers WHERE id = ?;`;

    pool.query(query,
        id,
        (err, res) => {
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
                responseHandler(true, 200, 'Answer Removed', null)
            );
        });
}

// retrieveAll

Answer.retrieveAll = (questionId, result) => {
    let query = ` SELECT
                    answers.id, question_id, answers.user_id, user_name, answers.answer, answers.created_at 
                    FROM answers 
                    JOIN questions ON questions.id = question_id 
                    JOIN users ON users.id = answers.user_id 
                    WHERE question_id = ?;`;

    pool.query(query,
        questionId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no answers', null),
                    null
                );
                return;
            }
            result(
                null,
                responseHandler(true, 200, 'Success', results)
            );
        });
}


module.exports = Answer;