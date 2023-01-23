

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');
const {getComments, addComment, deleteComment} = require('./comments.controller');


router.get('/:id', getComments);

router.post(
    '/:id',
    [
        auth,
        [
            check('comment', 'comment is required')
                .not()
                .isEmpty()
        ]
    ], addComment);


router.delete('/:id', [auth, checkOwnership], deleteComment);



module.exports = router;