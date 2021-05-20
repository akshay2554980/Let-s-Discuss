// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAi7Whixx9Pg8aqmhNZS8EIyIL-fYPtcqE",
    authDomain: "whatsapp-47bc9.firebaseapp.com",
    projectId: "whatsapp-47bc9",
    storageBucket: "whatsapp-47bc9.appspot.com",
    messagingSenderId: "788029053670",
    appId: "1:788029053670:web:8cf5f935fccb4991053927",
    measurementId: "G-H5E3DCGFB4"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
//passing all the configurations and giving its reference to the firebaseApp
const db =firebaseApp.firestore(); //access files
const auth=firebase.auth(); //authentication.
const provider=new firebase.auth.GoogleAuthProvider(); // hree i am using google auth

export {auth,provider};
export default db;