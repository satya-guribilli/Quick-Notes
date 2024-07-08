import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, createStore } from "redux";
import demoReducer from "./store/reducers/demoNotesReducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase,
} from "react-redux-firebase";
import {
  createFirestoreInstance,
  firestoreReducer,
  getFirestore,
  reduxFirestore,
} from "redux-firestore";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import userNotesReducer from "./store/reducers/userNotesReducer";

const rrfConfig = {
  attachAuthIsReady: true,
  userProfile: "users",
  useFirestoreForProfile: true,
};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0LFI4rXV3Q83TU1Onu0VAG7FpqEYAkhQ",
  authDomain: "react-notes-e796a.firebaseapp.com",
  projectId: "react-notes-e796a",
  storageBucket: "react-notes-e796a.appspot.com",
  messagingSenderId: "137546639145",
  appId: "1:137546639145:web:b9bddb7386d27330383938"
};



firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rootReducer = combineReducers({
  demo: demoReducer,
  auth: authReducer,
  userNotes: userNotesReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares), reduxFirestore(firebase))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


serviceWorkerRegistration.register();

reportWebVitals();
