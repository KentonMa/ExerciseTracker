import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';

import SiteNavbar from './components/navbar.component';
import Login from './components/login.component';
import ExerciseList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';

library.add(faPencilAlt, faTrashAlt);

function App() {
  return (
    <Router>
      <SiteNavbar />
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
