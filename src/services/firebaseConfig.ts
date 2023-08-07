import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDItiPZK6ZXK2rkhcSVcZ6FKpvSiCZPgsM",
  authDomain: "memorax-v2.firebaseapp.com",
  projectId: "memorax-v2",
  storageBucket: "memorax-v2.appspot.com",
  messagingSenderId: "495850248046",
  appId: "1:495850248046:web:b9def6b7d7e30fb11b537f",
  measurementId: "G-F3YVYDQLFF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);