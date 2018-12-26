import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
import firebase from './Firebase';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import logo from './logo.svg';
import Nav from './Nav';
import Signup from './Signup';

class App extends Component {

  constructor(){
    super();
    this.state={
      displayName: null, 
      userID: null,
    }

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
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Nav userID={this.state.userID}/>
        <Router>
          <Signup path="/signup" user={this.state.userID} registerUser={this.registerUser}/>
        </Router>
      </div>
    );
  }
}

export default App;
