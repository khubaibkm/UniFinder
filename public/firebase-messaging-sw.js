importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAkysbOSG5biWBdT1l3XntF-hXv-zoSprE",
  authDomain: "unifinder-dd842.firebaseapp.com",
  projectId: "unifinder-dd842",
  storageBucket: "unifinder-dd842.appspot.com",
  messagingSenderId: "2258810552",
  appId: "1:2258810552:web:acd35f5f8c457a389ea64d",
  measurementId: "G-KRGPDX1ZYH",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
