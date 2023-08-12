// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtL--YEGFlg4xkuJrDAMXnXEKIkZEMlfg",
  authDomain: "highteequeen-c8dec.firebaseapp.com",
  projectId: "highteequeen-c8dec",
  storageBucket: "highteequeen-c8dec.appspot.com",
  messagingSenderId: "576089908341",
  appId: "1:576089908341:web:6ae71edbe8667bcfd8443c",
  measurementId: "G-8WG1E0VK2L"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
// firebase.initializeApp(firebaseConfig);

// // Export Firebase Storage
// const storage = firebase.storage();

// export { storage };