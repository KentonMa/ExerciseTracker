import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (msg, status, type = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, type }
    };
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
}
