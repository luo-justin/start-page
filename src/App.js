import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
import firebase from './Firebase';
import { DragDropContext } from 'react-beautiful-dnd';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Nav from './Nav';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';


import initialData from './initial-data';

class App extends Component {

  onBeforeDragStart = () => {
    /*...*/
  };

  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    // the only one that is required
  };


  constructor(){
    super();
    this.state={
      displayName: null, 
      userID: null,
      taskList: []
    }

    this.db = firebase.firestore();
    this.ref = null;

  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.setState({
          displayName: user.displayName,
          userID: user.uid
        });

        this.ref = this.db
        .collection("users")
        .doc(user.uid)
        .collection("taskList")
        .orderBy("timestamp", "asc")
        .onSnapshot((querySnapshot) => {
          var taskList = []

          querySnapshot.forEach((doc)=> {
            taskList.push({
                taskID: doc.id,
                content: doc.data().content,
                timestamp: doc.data().timestamp
              });
          });
          this.setState({
            taskList: taskList
          })
        });
      }
      else{
         this.setState({
            displayName: null,
            userID: null
          });
         this.ref();
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
          // Add a new document in collection "cities"
          this.db.collection("users").doc(user.uid).set({
              name: "Los Angeles",
              state: "CA",
              country: "USA"
          })
          .then(() =>{
              console.log("Document successfully written!");
              this.setState({
                displayName: displayName,
                userID: user.uid
              });
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
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
          <Home path="/" userID={this.state.userID} taskList={this.state.taskList}/>
          <Signup path="/signup" registerUser={this.registerUser}/>
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default App;
