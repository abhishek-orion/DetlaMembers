import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const {
  REACT_APP_LOCAL_ENV_API_KEY,
  REACT_APP_LOCAL_ENV_AUTH_DOMAIN,
  REACT_APP_LOCAL_ENV_DATABASE_URL,
  REACT_APP_LOCAL_ENV_PROJECT_ID,
  REACT_APP_LOCAL_ENV_STORAGE_BUCKET,
  REACT_APP_LOCAL_ENV_MESSAGING_SENDER_ID,
  REACT_APP_LOCAL_ENV_APP_ID,
} = process.env;

const app = firebase.initializeApp({
  apiKey: REACT_APP_LOCAL_ENV_API_KEY,
  authDomain: REACT_APP_LOCAL_ENV_AUTH_DOMAIN,
  databaseURL: REACT_APP_LOCAL_ENV_DATABASE_URL,
  projectId: REACT_APP_LOCAL_ENV_PROJECT_ID,
  storageBucket: REACT_APP_LOCAL_ENV_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_LOCAL_ENV_MESSAGING_SENDER_ID,
  appId: REACT_APP_LOCAL_ENV_APP_ID,
});

export const database = firebase.firestore();
export const auth = app.auth();
export default app;
