const router = require('express').Router();
// const auth = require('../middleware/auth');
const {addQuestion}  = require('../questions/question.controller')

// router.get('/', questionsControlle.getAllQuestions);
router.post('/post', addQuestion )
// router.get('/:id', questionsControlle.getSingleQuestion)

module.exports = router;




