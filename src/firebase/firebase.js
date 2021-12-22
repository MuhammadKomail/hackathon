// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {
    getDatabase,
    set,
    push,
    get,
    remove,
    ref,
    onValue,
    onChildAdded,
    onChildChanged,
    child,
    query,
    update,
    // remove
} from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCpUFpXEQMVq5fXR_mT5G8hvRWN1JvR1l4",
    authDomain: "react-website-9590c.firebaseapp.com",
    databaseURL: "https://react-website-9590c-default-rtdb.firebaseio.com",
    projectId: "react-website-9590c",
    storageBucket: "react-website-9590c.appspot.com",
    messagingSenderId: "721379393036",
    appId: "1:721379393036:web:24cdfbce2524af495cf829",
    measurementId: "G-DCL8WHS5C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getDatabase(app)
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    set,
    push,
    // remove,
    ref,
    onValue,
    query,
    onChildAdded,
    onChildChanged,
    child,
    db,get,
    update,
    remove
}