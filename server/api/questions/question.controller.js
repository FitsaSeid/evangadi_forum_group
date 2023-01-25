const { validationResult } = require('express-validator');
const Question = require('../questions/question.service');
const responseHandler = require('../helpers/helperFunction')

  const addQuestion= (req, res) =>{
      const errors = validationResult(req);
    //   console.log(res)
      if (!errors.isEmpty()) {
          return res
              .status(400)
              .json(responseHandler(false, 400, errors.array()[0].msg, null));
      }
     try{
       const question = new Question ( {
        
           question : req.body.question,
           question_description : req.body.question_description,
           userId: req.user.id,
           tagname: req.body.tagname
       
    }   

    
    )
    console.log(question)


     // Save Post in the database
        Question.create(question, (err, data) => {

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
}

const getSingleQuestion = (req, res) => {
        try {
            Question.retrieveOne(req.params.id, (err, data) => {
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
    }

const getAllQuestions = (req, res) => {
    const { tagname } = req.params;

    try {
        Question.retrieveAll({
            'action': tagname ? 'tag' : (req.url.includes('top') ? 'top' : 'basic'),
            'tagName': tagname
        }, (err, data) => {
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

const deletePost = (req, res) => {
    try {
        Question.remove(req.params.id, (err, data) => {
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

module.exports = { addQuestion, getSingleQuestion, getAllQuestions, deletePost }
// getAllQuestions
// addQuestion
// getSingleQuestion