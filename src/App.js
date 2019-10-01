import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import SiteNavbar from './components/navbar.component';
import Login from './components/login.component';
import LogList from './components/log-list.component';
import ExerciseList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import ProtectedRoute from './components/ProtectedRoute';

library.add(faPencilAlt, faTrashAlt, faPlus);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <SiteNavbar />
          <Switch>
            <Route path="/" exact component={Login} />
            <ProtectedRoute path="/logs" exact component={LogList} />
            <ProtectedRoute path="/logs/:id" component={ExerciseList} />
            <Route path="/edit/:id" component={EditExercise} />
            <Route path="/create" component={CreateExercise} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
