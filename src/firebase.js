import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXY88--dVJwYIEB21C3DhNEQGv1I8OfHY",
    authDomain: "same-e97dd.firebaseapp.com",
    databaseURL: "https://same-e97dd.firebaseio.com",
    projectId: "same-e97dd",
    storageBucket: "same-e97dd.appspot.com",
    messagingSenderId: "416091603562",
    appId: "1:416091603562:web:69bfdd69b35c96b898c013",
    measurementId: "G-S79CLKE8CM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;