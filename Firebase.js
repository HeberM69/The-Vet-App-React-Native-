import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBbn0w_WlYqXLirI6WaiPYKuIdSwlzsq04",
  authDomain: "thevetapp-reactnative-ca6be.firebaseapp.com",
  projectId: "thevetapp-reactnative-ca6be",
  storageBucket: "thevetapp-reactnative-ca6be.appspot.com",
  messagingSenderId: "7055827441",
  appId: "1:7055827441:web:151d2326647f1304c2e450",
  measurementId: "G-5N7WBYF60K"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const registerUser = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
};

const addUserToFirestore = (userUid, email) => {
    const userDocRef = doc(db, 'users', userUid);
    const date = new Date();
    const timestamp = Timestamp.fromDate(date);
    const data = {
      email: email,
      registeredAt: timestamp,
    };
    return setDoc(userDocRef, data);
};

const loginUser = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
    const auth = getAuth();
    return signOut(auth);
};

const addAnimalToFirestore = (name, age, weight) => {
    const animalCollectionRef = collection(db, 'animals');
    const date = new Date();
    const timestamp = Timestamp.fromDate(date);
    const data = {
      name: name,
      age: age,
      weight: weight,
      registeredAt: timestamp,
    };
    return addDoc(animalCollectionRef, data);
};

export { firebaseApp, db, addAnimalToFirestore, registerUser, addUserToFirestore, loginUser, logoutUser };