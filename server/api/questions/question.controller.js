
const Question = require('../questions/question.service');
const responseHandler = require('../helpers/helperFunction')

  const addQuestion= (req, res) =>
 {
        console.log(req.body.question)
        console.log(req.body.question_description)
        if (!req.body.question ){
        return res.status(400).json({ msg: 'Not all fields have been provided!' })

    }try{
       const question = new Question ( {
           question : req.body.question,
           question_description : req.body.question_description,
           userId : req.body.userId
       
    }   
    )

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
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
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


module.exports = { addQuestion, getSingleQuestion, getAllQuestions }
// getAllQuestions
// addQuestion
// getSingleQuestion