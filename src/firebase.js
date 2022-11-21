import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyCzA1re5rpav-aY-8FCm5jmczS4aBq2kkA",
    authDomain: "snapchat-clone-yt-88820.firebaseapp.com",
    projectId: "snapchat-clone-yt-88820",
    storageBucket: "snapchat-clone-yt-88820.appspot.com",
    messagingSenderId: "377929135488",
    appId: "1:377929135488:web:2857fee89aa3bc5ebfbd65"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,auth,storage,provider};