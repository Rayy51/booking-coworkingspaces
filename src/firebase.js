// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeuwphHDJxMpQYD0YAMnOFQs-6dfZ2h0E",
    authDomain: "co-working-app-51bac.firebaseapp.com",
    projectId: "co-working-app-51bac",
    storageBucket: "co-working-app-51bac.appspot.com",
    messagingSenderId: "110488116631",
    appId: "1:110488116631:web:7874ee84319d25494a38d2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);