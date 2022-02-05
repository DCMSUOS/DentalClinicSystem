// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtw_1lavR8nsZaD3ZHwOENOCzqmZdyU5Y",
  authDomain: "dcmsuos.firebaseapp.com",
  projectId: "dcmsuos",
  storageBucket: "dcmsuos.appspot.com",
  messagingSenderId: "907774177572",
  appId: "1:907774177572:web:e8e93258e734475bae83b1",
  measurementId: "G-0E1SN29FYG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default firebase;
