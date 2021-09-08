import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC0UbMEJaxzz2jd__bCEHXGh-TX5cqYJw0",
    authDomain: "svelte-crud-882f1.firebaseapp.com",
    projectId: "svelte-crud-882f1",
    storageBucket: "svelte-crud-882f1.appspot.com",
    messagingSenderId: "355168350365",
    appId: "1:355168350365:web:d110bf20a31a5a4af92474"
  };
  
  console.log(firebase);
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 export const db = firebase.firestore();
 
