/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCkMnmikLIbR5vnSNv1f7JiP80VWO_QTB0',
  authDomain: 'miniblog-23a9f.firebaseapp.com',
  projectId: 'miniblog-23a9f',
  storageBucket: 'miniblog-23a9f.appspot.com',
  messagingSenderId: '774477320763',
  appId: '1:774477320763:web:a41372ef14abcb16c3c21e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
export { db };
