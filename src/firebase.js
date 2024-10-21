import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMS0hEuIiv4sU7PqGZhXMmPw8200yp6TI",
    authDomain: "masai-rct2-eval2.firebaseapp.com",
    projectId: "masai-rct2-eval2",
    storageBucket: "masai-rct2-eval2.appspot.com",
    messagingSenderId: "143310062639",
    appId: "1:143310062639:web:ca0e07f608749e3c4872da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize authentication


export { db, auth }; // Export both db and auth
