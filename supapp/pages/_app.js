import { useEffect } from 'react';
import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import { doc, setDoc } from "firebase/firestore";

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", "user.uid");
      const data = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
      setDoc(docRef, data)
        .then(() => {
          console.log("Document has been added successfully");
        })
        .catch(error => {
          console.log(error);
        })

    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}
