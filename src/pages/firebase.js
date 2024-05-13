import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVkhpIp8rViZxK4iYxX37TVWnEIfsluvg",
  authDomain: "react-data-c9a38.firebaseapp.com",
  projectId: "react-data-c9a38",
  storageBucket: "react-data-c9a38.appspot.com",
  messagingSenderId: "339842426810",
  appId: "1:339842426810:web:cf489c1f23ffd256b31f83"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;