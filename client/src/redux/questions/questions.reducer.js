import {
    GET_QUESTIONS,
    GET_QUESTION,

    GET_TOP_QUESTIONS,
    GET_TAG_QUESTIONS,

    QUESTION_ERROR,


    DELETE_QUESTION,
    ADD_QUESTION
} from './questions.type'

const initialState = {
    questions: [],
    question: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS:
        case GET_TOP_QUESTIONS:
        case GET_TAG_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case GET_QUESTION:
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case ADD_QUESTION:
            return {
                ...state,
                questions: [action.payload, ...state.posts],
                loading: false
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload),
                loading: false
            };
        case QUESTION_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}