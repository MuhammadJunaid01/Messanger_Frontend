import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBDL--T8lkYPploSWA7NI7aYz37SBrpUiU",
  authDomain: "chat-app-bbe0f.firebaseapp.com",
  projectId: "chat-app-bbe0f",
  storageBucket: "chat-app-bbe0f.appspot.com",
  messagingSenderId: "711209698586",
  appId: "1:711209698586:web:61163cd01bd381086618a3",
  measurementId: "G-XN3W1CNFV1",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
