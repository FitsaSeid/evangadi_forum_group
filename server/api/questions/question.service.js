const pool = require('../../config/database');

// constructor
const Question = function (question) {
    this.question = question.question;
    this.question_description = question.question_description;
    this.userId = results[0].user_id;

}


// create
Question.create = (newQuestion, callback)=>{
    const query =`INSERT INTO questions(user_id,question,question_description) VALUES (?,?,?);`
    
    pool.query(query, [newQuestion.userId,newQuestion.question, newQuestion.question_description], (err, res) => {
       
         if (err) {
             console.log(err)
             return callback(err);
            }
        return callback(null, res);
        }
     );
}

module.exports = Question;




// create
// remove
// retrieveOne
// retrieveAll