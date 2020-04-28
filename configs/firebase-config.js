import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp3W4hVbusHAC1Zgb_8ubx7CJ4txymUOc",
  authDomain: "photohub-e7e04.firebaseapp.com",
  databaseURL: "https://photohub-e7e04.firebaseio.com",
  projectId: "photohub-e7e04",
  storageBucket: "photohub-e7e04.appspot.com",
  messagingSenderId: "300710467693",
  appId: "1:300710467693:web:adba845fcf422e65bd8764",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestoreRef = firebase.firestore();
