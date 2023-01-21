const router = require('express').Router();
// const auth = require('../middleware/auth');
const { addQuestion, getSingleQuestion, getAllQuestions, AllQuestions }  = require('../questions/question.controller')

// router.get('/', questionsControlle.getAllQuestions);
router.post('/post', addQuestion )
router.get('/:id', getSingleQuestion)
router.get('/', getAllQuestions)





module.exports = router;




