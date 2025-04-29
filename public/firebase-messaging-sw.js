/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCQwKetcVFjZZ8i3vE9y7MJhjknxxONk-k",
  authDomain: "bullman-boocking.firebaseapp.com",
  projectId: "bullman-boocking",
  storageBucket: "bullman-boocking.appspot.com",
  messagingSenderId: "629314221677",
  appId: "1:629314221677:web:db38e969bdd40a5fee7164",
  measurementId: "G-EZ8EQ2QDF5",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload?.data?.title ?? "";
  const notificationOptions = {
    body: payload?.data?.body ?? "",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
