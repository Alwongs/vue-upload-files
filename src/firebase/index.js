import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC4CloYo1SEo1hvIvnL9ZabVwvvwQDxv6o",
    authDomain: "like-73.firebaseapp.com",
    projectId: "like-73",
    storageBucket: "like-73.appspot.com",
    messagingSenderId: "438581254023",
    appId: "1:438581254023:web:59976a2acf1d0b0fb52522",
    measurementId: "G-VVF877NWT5"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth }