const responseHandler = require('../helpers/helperFunction')
const { validationResult } = require('express-validator');
const Comment = require('../comments/comments.service');

const getComments = (req, res) => {
    try {
        Comment.retrieveAll(req.params.id, (err, data) => {
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

const addComment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(responseHandler(false, 400, errors.array()[0].msg, null));
    }

    try {
        const comment = new Comment({
            comment: req.body.comment,
            user_id: req.user.user_id,
            question_id: req.params.id
        });
        // Save Comment in the database
        Comment.create(comment, (err, data) => {
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

const deleteComment = (req, res) => {
    try {
        Comment.remove(req.params.id, (err, data) => {
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

module.exports  = {
    getComments,
    addComment,
    deleteComment
};