const pool = require('../../config/database');
const responseHandler = require('../helpers/helperFunction')

// constructor
const Comment = function (answer) {
    this.comment = answer.comment;
    this.user_id = answer.user_id;
    this.question_id = answer.question_id;
};

Comment.create = (newComment, result) => {
    const query = `INSERT INTO comments(comment,user_id,question_id) VALUES(?,?,?);`;

    pool.query(
        query,
        [newComment.comment, newComment.user_id, newComment.question_id],
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
                responseHandler(true, 200, 'Comment Added', res.insertId)
            );
        });
};

Comment.remove = (id, result) => {
    const query = ` DELETE FROM comments WHERE id = ?;`;

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
                responseHandler(true, 200, 'Comment Removed', null)
            );
        });
}

Comment.retrieveAll = (questionId, result) => {
    let query = `   SELECT
                    comments.id, question_id, comments.user_id, user_name, comments.comment, comments.created_at 
                    FROM comments 
                    JOIN questions ON questions.id = comments.question_id 
                    JOIN users ON users.id = comments.user_id 
                    WHERE question_id = ?;`;

    pool.query(query,
        questionId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no comments', null),
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


module.exports = Comment;