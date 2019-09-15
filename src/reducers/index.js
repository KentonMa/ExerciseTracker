import { combineReducers } from 'redux';
import logReducer from './logReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    log: logReducer,
    auth: authReducer,
    error: errorReducer
});