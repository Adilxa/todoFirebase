import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB6m9lVDTEWQraukJzuirY9O7YujBEOxE8",
    authDomain: "todo-crud-88470.firebaseapp.com",
    projectId: "todo-crud-88470",
    storageBucket: "todo-crud-88470.appspot.com",
    messagingSenderId: "229952763174",
    appId: "1:229952763174:web:a11c383b326796244a3de7"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export { db };