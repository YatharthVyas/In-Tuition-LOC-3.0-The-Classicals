import firebase from "firebase/app";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDR2YFHxt4H5sa3mcdk_tZJ9PouQlIcFGA",
  authDomain: "acm-hack-a4c4d.firebaseapp.com",
  projectId: "acm-hack-a4c4d",
  storageBucket: "acm-hack-a4c4d.appspot.com",
  messagingSenderId: "59607327177",
  appId: "1:59607327177:web:7d398682fe3d61267f8818",
  measurementId: "G-H3C4QMMPZD",
});
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
