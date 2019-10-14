import { combineReducers } from 'redux';
import logReducer from './logReducer';
import logExerciseReducer from './logExerciseReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    log: logReducer,
    logExercise: logExerciseReducer,
    auth: authReducer,
    error: errorReducer
});