import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

 const config = {
    apiKey: "AIzaSyDA8AKyG87Frj3dBavgXRN7wiM9CLaFUP0",
    authDomain: "start-page-98.firebaseapp.com",
    databaseURL: "https://start-page-98.firebaseio.com",
    projectId: "start-page-98",
    storageBucket: "start-page-98.appspot.com",
    messagingSenderId: "1005390990500"
  };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;