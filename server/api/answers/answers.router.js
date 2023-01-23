const { check } = require('express-validator');
const { getAnswers,
    addAnswer,
    deleteAnswer  } = require('../answers/answers.controller');
const auth = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');
const router = require('express').Router();


router.get('/:id', getAnswers);

router.post('/:id', [ auth,
        [
            check('text', 'text is required')
                .not()
                .isEmpty()
        ]
    ], addAnswer);

router.delete('/:id', [auth, checkOwnership], deleteAnswer);

module.exports = router;



    //getAllanswer
    //remove indv
    //post Answer