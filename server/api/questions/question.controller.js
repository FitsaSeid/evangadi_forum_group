


const Question = require('../questions/question.service');

module.exports = {
    addQuestion: (req, res) =>
 {
        console.log(req.body.question)
        console.log(req.body.question_description)
        if (!req.body.question ){
        return res.status(400).json({ msg: 'Not all fields have been provided!' })

    }try{
       const question = new Question ( {
           question : req.body.question,
           question_description : req.body.question_description,
        //    userId : req.body.userId 
       
    }   
    )

   

     // Save Post in the database
        Question.create(question,(err, data) => {

            if (err) {
                console.log(err)
                return data(err);
            }
            return data(null, res);
        })
        
        }catch(err){
            console.log(err)

     }
}

// const getSingleQuestion = (req, res) => {

// }

// const getAllQuestions = (req, res) => {


// }


}


// getAllQuestions
// addQuestion
// getSingleQuestion