const pool = require('../../config/database');
// import responseHandler from '../helpers/helperFunction'
const responseHandler = require('../helpers/helperFunction')

// constructor
const Question = function (question) {
    this.question = question.question;
    this.question_description = question.question_description;
    this.userId = question.userId;

}


// create
Question.create = (newQuestion, result)=>{
    const query = `INSERT INTO questions(question,question_description,users) VALUES (?,?,?)
   `; 
    
    pool.query(query, [newQuestion.question, newQuestion.question_description, newQuestion.userId], (err, res) => {
       
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
            responseHandler(true, 200, 'question Created', res.userId)
        );
        }
     );
}
// retrieveOne


Question.retrieveOne = (questionId, result) => {
    const query = ` SELECT 
                    questions.id,
                    questions.user_id,
                    tag_id,
                    COUNT(DISTINCT answers.id) as answer_count,
                    COUNT(DISTINCT comments.id) as comment_count,
                    user_name,
                    question,
                    questions.question_description,
                    tagname,
                    questions.created_at 

                    FROM questions 
                    JOIN posttag ON questions.id = question_id 
                    JOIN tags ON tag_id = tags.id 
                    JOIN users ON user_id = users.id 
                    LEFT JOIN answers ON answers.question_id = questions.id 
                    LEFT JOIN comments ON questions.id = comments.question_id 
                    WHERE questions.id = ?;`;
    pool.query(query,
        questionId,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There isn\'t any post by this id', null),
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

Question.retrieveAll = ({ action, tagName }, result) => {
    let query = '';
    let base = `SELECT 
                questions.id,questions.user_id,user_name,COUNT(DISTINCT answers.id) 
                as answer_count,COUNT(DISTINCT comments.id) 
                as comment_count,tag_id,question,questions.question_description,tagname,questions.created_at 
                FROM questions 

                JOIN posttag ON questions.id = question_id 
                JOIN tags ON tag_id = tags.id 
                
                JOIN users ON user_id = users.id 
                LEFT JOIN answers ON answers.question_id = questions.id 
                LEFT JOIN comments ON questions.id = comments.question_id `;

        if (action === 'basic') {
            query = 'GROUP BY questions.id ORDER BY questions.created_at DESC;';
        } else if (action === 'top') {
            query = 'GROUP BY questions.id ORDER BY answer_count DESC,comment_count DESC;';
        } else if (action === 'tag') {
            query = 'WHERE tags.tagname = ? GROUP BY questions.id ORDER BY questions.created_at DESC;';
        } else {
        result(
            responseHandler(false, 400, 'Incorrect Action', null),
            null
        );
        return;
    }
    pool.query(base + query,
        tagName ? tagName : null,
        (err, results) => {
            if (err || results.length === 0) {
                console.log('error: ', err);
                result(
                    responseHandler(false, err ? err.statusCode : 404, err ? err.message : 'There are no posts', null),
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



module.exports = Question;











// retrieveAll

// remove
// retrieveOne
// retrieveAll