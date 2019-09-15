import { GET_LOGS, ADD_LOG, UPDATE_LOG, DELETE_LOG, LOADING_LOGS } from '../actions/types';

const initialState = {
    logs: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LOGS:
            return {
                ...state,
                logs: action.payload,
                loading: false
            };
        case ADD_LOG:
            return {
                ...state,
                logs: [action.payload, ...state]
            };
        case UPDATE_LOG:
            return state.map(log => 
                log._id === action.id ?
                { ...log, description: action.payload.description, date: action.payload.date } :
                log
            )
        case DELETE_LOG:
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.id)
            };
        case LOADING_LOGS:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
