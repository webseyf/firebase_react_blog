// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBCDErUtJQCCxb3C-e9mU-bSO9fSzaZ_rw',
  authDomain: 'blog-firebase-react-e20aa.firebaseapp.com',
  projectId: 'blog-firebase-react-e20aa',
  storageBucket: 'blog-firebase-react-e20aa.appspot.com',
  messagingSenderId: '352349184949',
  appId: '1:352349184949:web:5c64e7b38f6b9e4a396ffc',
  measurementId: 'G-GLZMJML7ZR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
