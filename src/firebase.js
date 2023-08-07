// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from '@firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxEAzcuZmNE8RuCTXMB1gqbh-OIU6bpAQ",
  authDomain: "react-http-1474c.firebaseapp.com",
  databaseURL: "https://react-http-1474c-default-rtdb.firebaseio.com",
  projectId: "react-http-1474c",
  storageBucket: "react-http-1474c.appspot.com",
  messagingSenderId: "572564746300",
  appId: "1:572564746300:web:c090334fb18c55f9a91339",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export  const database = getDatabase(app);