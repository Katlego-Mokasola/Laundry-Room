// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKRfJ8s73b1i5pDUuHbOflUfs74w8yDjM",
  authDomain: "laundry-room-de496.firebaseapp.com",
  databaseURL: "https://laundry-room-de496-default-rtdb.firebaseio.com",
  projectId: "laundry-room-de496",
  storageBucket: "laundry-room-de496.appspot.com",
  messagingSenderId: "819063306287",
  appId: "1:819063306287:web:60bac510497ca0fc11eeda",
  measurementId: "G-5DFL0S3QJH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { signInWithGoogle , app,auth,provider};
