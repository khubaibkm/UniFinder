import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

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
const messaging = getMessaging(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const githubProvider = new GithubAuthProvider();

export const requestForToken = async () =>{
  try {
    const currentToken = await getToken(messaging, { vapidKey: "BK5NvsdDcjb-rYBqzlmsUt4cw5s4uqe5MjWMni6YTW6nmqU6Dq6JEWECZkHtQ1MGWxrw_cSefLlTcmLQoSFtab0" });
    if (currentToken) {
      console.log("Token: ", currentToken);
    }
    else {
      console.log("no token available!!");
    }
  } catch (err) {
    console.log("error in registring token", err);
  }
}

export const onMessageListener = () =>{
  return new Promise((resolve) =>{
    onMessage(messaging, (payload) =>{
      console.log("Onmessage payload", payload);
      resolve(payload)
    })
  })
}
