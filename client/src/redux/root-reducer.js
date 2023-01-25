import { combineReducers } from 'redux';

import {alert} from './alert/alert.reducer';
import {auth} from './auth/auth.reducer';

import {user} from './users/users.reducer';
import {question} from './questions/questions.reducer';
import {answer} from './answers/answers.reducer'
import {comment} from './comments/comments.reducer'

export default combineReducers({
    alert,
    auth,
    user,
    question,
    answer,
    comment
    
})