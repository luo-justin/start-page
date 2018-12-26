import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
import firebase from './Firebase';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Nav from './Nav';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';

class App extends Component {

  constructor(){
    super();
    this.state={
      displayName: null, 
      userID: null,
    }

  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.setState({
          displayName: user.displayName,
          userID: user.uid
        });
      }
      else{
         this.setState({
            displayName: null,
            userID: null
          });
      }

    });

  }

  registerUser = displayName =>{
    firebase.auth().onAuthStateChanged(user =>{
      if (user){
        user.updateProfile({
          displayName: displayName
        })
        .then(() => {
          this.setState({
            displayName: displayName,
            userID: user.uid
          });
          navigate('/');
        });
      }
    });
  }

  logoutUser = e => {
    e.preventDefault();
    firebase.auth().signOut().then( ()=> {
       navigate('/login');

    }).catch((error) => {
      // An error happened.
    });
  }

  render() {
    return (
      <div className="App">
        <Nav userID={this.state.userID} logoutUser={this.logoutUser}/>
        <Router>
          <Home path="/" />
          <Signup path="/signup" registerUser={this.registerUser}/>
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default App;
