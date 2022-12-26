import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD_AnOHAf1oXScer40y37rV_n_cvUngt1k",
    authDomain: "supapp-e77ec.firebaseapp.com",
    projectId: "supapp-e77ec",
    storageBucket: "supapp-e77ec.appspot.com",
    messagingSenderId: "105494466599",
    appId: "1:105494466599:web:b7e7f81ecdbd07f7ddbe02"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth();
const provider = new GoogleAuthProvider();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

// export const addCollectionAndDocument = async (collectionKey) => {
//     const collectionRef = collection(db, collectionKey);
// }



export { db, auth, provider, signInWithGooglePopup };
