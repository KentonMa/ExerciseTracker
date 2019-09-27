import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from './actions/types';
import { tokenConfig } from './actions/authActions';
import { returnErrors } from './actions/errorActions';
import axios from 'axios';

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

store.dispatch({ type: USER_LOADING });

axios.get('http://localhost:5000/auth/user', tokenConfig(store.getState))
    .then(res => {
        store.dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        render();
    })
    .catch(err => {
        store.dispatch(returnErrors(err.response.data.msg, err.response.status, AUTH_ERROR));
        store.dispatch({
            type: AUTH_ERROR
        });
        render();
    });
