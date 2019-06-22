import firebase from 'firebase/app';
import 'firebase/database';
import apiKeys from './helpers/apiKeys.json';

// Initialize Firebase
const firebaseInitialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
};

export default { firebaseInitialize };
