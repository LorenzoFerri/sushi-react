import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkQetrmcI0K1PHwhsxTMo9mCahOaApn8o",
  authDomain: "sushi-react.firebaseapp.com",
  databaseURL: "https://sushi-react.firebaseio.com",
  projectId: "sushi-react",
  storageBucket: "sushi-react.appspot.com",
  messagingSenderId: "482643681433",
  appId: "1:482643681433:web:533b07c24a0936cd209808",
  measurementId: "G-EYD0LYBFQY",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
