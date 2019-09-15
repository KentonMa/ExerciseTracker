import axios from 'axios';
import { GET_LOGS, ADD_LOG, UPDATE_LOG, DELETE_LOG, LOADING_LOGS } from '../actions/types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getLogs = () => (dispatch, getState) => {
    dispatch(setLogsLoading());
    axios.get('http://localhost:5000/logs', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LOGS,
                payload: res.data
            })
        })
}

export const addLog = log => (dispatch, getState) => {
    axios.post('http://localhost:5000/logs', log, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_LOG,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const updateLog = (log, id) => (dispatch, getState) => {
    axios.put(`http://localhost:5000/logs/${id}`, log, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_LOG,
                payload: res.data,
                id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteLog = id => (dispatch, getState) => {
    axios.delete(`http://localhost:5000/logs/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_LOG,
                id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setLogsLoading = () => {
    return {
        type: LOADING_LOGS
    };
}
