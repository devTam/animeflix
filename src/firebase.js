import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA99bYNrCcC5--ob3l9jXjh6qNhkQcHrIw",
  authDomain: "animeflix-d456a.firebaseapp.com",
  projectId: "animeflix-d456a",
  storageBucket: "animeflix-d456a.appspot.com",
  messagingSenderId: "1072043207600",
  appId: "1:1072043207600:web:56f7907821697bbe42c475"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore()
  
  export const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  