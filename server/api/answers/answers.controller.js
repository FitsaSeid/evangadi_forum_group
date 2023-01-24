const responseHandler = require('../helpers/helperFunction');
const { validationResult } = require('express-validator');
const Answer = require('../answers/answers.service');
const User = require('../users/user.service');


const getAnswers = (req, res) => {
    try {
        console.log(req)
        Answer.retrieveAll(req.params.id, (err, data) => {
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
const addAnswer = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
        const answer = new Answer({
            answer: req.body.text,
            user_id: req.user.id,
            question_id: req.params.id
        });
        // Save Answer in the database
        Answer.create(answer, (err, data) => {
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

const deleteAnswer = async (req, res) => {
    try {
        Answer.remove(req.params.id, (err, data) => {
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



module.exports = {
    getAnswers,
    addAnswer,
    deleteAnswer
};