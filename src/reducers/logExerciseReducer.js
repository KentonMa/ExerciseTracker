import { GET_LOG_EXERCISES, ADD_LOG_EXERCISE } from '../actions/types';

const initialState = {
    logExercises: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LOG_EXERCISES:
            return {
                ...state,
                logExercises: action.payload
            };
        case ADD_LOG_EXERCISE:
            return {
                ...state,
                logExercises: [action.payload, ...state.logExercises]
            };
        default:
            return state;
    }
}
