import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAh_pyfzF6rjZhE-UcwVFnpHrE5_dDBP7o",
    authDomain: "fir-chat-95372.firebaseapp.com",
    projectId: "fir-chat-95372",
    storageBucket: "fir-chat-95372.appspot.com",
    messagingSenderId: "914436269138",
    appId: "1:914436269138:web:2750cb8cf1148ce7d2ab8b"
})

export const db = app.firestore();
export const auth = app.auth();
export default app;