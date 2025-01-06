import './App.css';

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseError } from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyCtyxWWJhYguvX5Kx6tpfNTIhPKICgjkqc",
  authDomain: "superchat-lester.firebaseapp.com",
  projectId: "superchat-lester",
  storageBucket: "superchat-lester.firebasestorage.app",
  messagingSenderId: "920056176834",
  appId: "1:920056176834:web:9e1c0f98fa138b27025b5b",
  measurementId: "G-WJ2DZ0KEZC"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [ user ] = useAuthState(auth)
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>⚛️🔥💬</h1>
        </div>
        <div>
          <SignOut/>
        </div>
      </header>
      <section className="App-section">
        { user ? 'qq' : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className='sign-in' onClick={()=>auth.signOut()}>Sign Out</button>
  )
}

export default App;
