const pool = require('../../config/database');

// constructor
const Question = function (question) {
    this.question = question.question;
    this.question_description = question.question_description;
    // this.userId = question.userId;

}


// create
Question.create = (newQuestion, data)=>{
    const query =`INSERT INTO questions(question,question_description) VALUES (?,?);`
    
    pool.query(query, [newQuestion.question, newQuestion.question_description], (err, res) => {
       
         if (err) {
             console.log(err)
             return data(err);
            }
        return data(null, res);
        }
     );
}

module.exports = Question;




// create
// remove
// retrieveOne
// retrieveAll