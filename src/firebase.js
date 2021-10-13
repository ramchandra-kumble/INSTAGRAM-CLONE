import firebase from 'firebase'
let firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_authDomain,
    databaseURL:  process.env.REACT_APP_databaseURL,
    projectId:process.env.REACT_APP_projectId,
    storageBucket: "learning-f80ea.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export let db = firebaseApp.firestore();
export let storage = firebase.storage();
export let provider = new firebase.auth.GoogleAuthProvider();

export default auth;