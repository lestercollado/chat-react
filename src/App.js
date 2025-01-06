import './App.css';

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

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
        { user ? <ChatRoom/> : <SignIn/>}
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
    <button className='sign-out' onClick={()=>auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [ messages ] = useCollectionData(query, {idField: 'id'});

  const [ formValue, setFormValue ] = useState('');

  const sendMessage = async(e) => {
     e.preventDefault();

     const { uid, photoURL } = auth.currentUser;

     await messagesRef.add({
       text: formValue,
       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
       uid,
       photoURL
     })

     setFormValue('');
     dummy.current.scrollIntoView({behavior: 'smooth'});

  }

  return (
    <>
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} placeholder='Write a message...'/>
        <button type='submit'>📨</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='user'/>
      <p>{text}</p>
    </div>
  )
}

export default App;
