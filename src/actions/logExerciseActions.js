import axios from 'axios';
import { GET_LOG_EXERCISES, ADD_LOG_EXERCISE } from '../actions/types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getLogExercises = (id) => (dispatch, getState) => {
    axios.get(`http://localhost:5000/logs/${id}/log-exercises`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LOG_EXERCISES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
}

export const addLogExercise = data => (dispatch, getState) => {
    axios.post('http://localhost:5000/log-exercises', data, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_LOG_EXERCISE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};