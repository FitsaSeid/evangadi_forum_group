const router = require('express').Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
// const auth = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');
const { addQuestion, getSingleQuestion, getAllQuestions, deletePost }  = require('../questions/question.controller')


router.post('/', auth, [
            check('title', 'Enter a question with minimum 15 characters').isLength({ min: 15 }),
            check('body', 'Enter a description with minimum 30 characters').isLength({ min: 30 })
], addQuestion )
router.get('/:id', getSingleQuestion)
router.get('/', getAllQuestions)
router.delete('/:id', [auth, checkOwnership], deletePost);
router.get('/top', getAllQuestions);
router.get('/tag/:tagname', getAllQuestions);





module.exports = router;




