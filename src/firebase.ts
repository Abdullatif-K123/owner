import { initializeApp } from 'firebase/app';
import { MessagePayload, deleteToken, getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyCQwKetcVFjZZ8i3vE9y7MJhjknxxONk-k",
    authDomain: "bullman-boocking.firebaseapp.com",
    projectId: "bullman-boocking",
    storageBucket: "bullman-boocking.appspot.com",
    messagingSenderId: "629314221677",
    appId: "1:629314221677:web:db38e969bdd40a5fee7164",
    measurementId: "G-EZ8EQ2QDF5"
  };

  const app = initializeApp(firebaseConfig);    
  const messaging = getMessaging(app);

export const getFirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BOHSriO1p7WsoxGLvzdlsmfL8ACj6wYvCfIF6VqHvpePZrueFdGFilCw8pb7RUKDVtStP_RX_xD3QBi62JoeYMk",
    });
    console.log(currentToken)
    return currentToken;
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};
getFirebaseToken();
export const onMessageListener = () =>
  new Promise((resolve: (payload: MessagePayload) => void) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
export const deleteFirebaseToken = () => {
  deleteToken(messaging);
};
