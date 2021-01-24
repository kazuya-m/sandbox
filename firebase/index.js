import { firebaseConfig } from './config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
if (!firebase.apps.length) {
  const ret = firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const db = firebase.firestore();
export const FirebaseTimestamp = firebase.firestore.Timestamp;