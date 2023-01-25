import {
    GET_COMMENTS,
    COMMENT_ERROR,
    ADD_COMMENT,
    DELETE_COMMENT
} from './comments.types';

import axios from 'axios';
import {setAlert} from '../alert/alert.actions';

export const getComments = id => async dispatch => {
    try {
        const res = await axios.get(`/api/questions/comments/${id}`);

        dispatch({
            type: GET_COMMENTS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add COMMENT
export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/questions/comments/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data.data
        });

        dispatch(setAlert(res.data.message, 'success'));

        dispatch(getComments(postId));
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Comment
export const deleteComment = CommentId => async dispatch => {
    try {
        const res = await axios.delete(`/api/questions/comments/${CommentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: CommentId
        });

        dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};