import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import {
GET_QUESTIONS,
GET_QUESTION,
GET_TOP_QUESTIONS,
GET_TAG_QUESTIONS,
QUESTION_ERROR,
DELETE_QUESTION,
ADD_QUESTION
} from './questions.type'


// Get Questions
export const getQuestions = () => async dispatch => {
    try {
        const res = await axios.get('/api/questions');

        dispatch({
            type: GET_QUESTIONS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get Question
export const getQuestion = id => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/${id}`);

        dispatch({
            type: GET_QUESTION,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//GET TOP Questions
export const getTopQuestions = () => async dispatch => {
    try {
        const res = await axios.get('/api/questions/top');

        dispatch({
            type: GET_TOP_QUESTIONS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//GET TAG POSTS
export const getTagQuestions = tagName => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/tag/${tagName}`);

        dispatch({
            type: GET_TAG_QUESTIONS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add post
export const addQuestion = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/questions', formData, config);

        dispatch({
            type: ADD_QUESTION,
            payload: res.data.data
        });

        dispatch(setAlert(res.data.message, 'success'));

        dispatch(getQuestions());
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deleteQuestion = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/questions/${id}`);

        dispatch({
            type: DELETE_QUESTION,
            payload: id
        });

        dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};