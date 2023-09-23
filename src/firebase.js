// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkysbOSG5biWBdT1l3XntF-hXv-zoSprE",
  authDomain: "unifinder-dd842.firebaseapp.com",
  projectId: "unifinder-dd842",
  storageBucket: "unifinder-dd842.appspot.com",
  messagingSenderId: "2258810552",
  appId: "1:2258810552:web:acd35f5f8c457a389ea64d",
  measurementId: "G-KRGPDX1ZYH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
