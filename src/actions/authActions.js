import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import { returnErrors } from './errorActions';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('http://localhost:5000/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, AUTH_ERROR));
            dispatch({
                type: AUTH_ERROR
            });
        })
}

export const login = ({ username, password }, history) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    axios.post('http://localhost:5000/auth', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            history.push('/logs');
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, LOGIN_FAIL));
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const register = ({ username, password }, history) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    axios.post('http://localhost:5000/users', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            history.push('/logs');
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.msg, err.response.status, REGISTER_FAIL));
            dispatch({
                type: REGISTER_FAIL
            });
        })
}

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}
