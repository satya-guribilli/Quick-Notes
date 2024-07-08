// Loading
export const AUTH_LOADING = "AUTH_LOADING";

// Sign Up Actions
export const SIGN_UP_LOADING = "SING_UP_LOADING";
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

// Sign In Actions
export const SIGN_IN_LOADING = "SIGN_IN_LOADING";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";

// Google Auth Actions
export const GOOGLE_SUCCESS = "GOOGLE_SUCCESS";
export const GOOGLE_ERROR = "GOOGLE_ERROR";

// Logout Actions
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

// SIGN UP USER
// This action creator takes in the name, email and password of the person.
// The user is created and their details are added to the database.
//
export const signUpUser = ({ name, email, password }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: AUTH_LOADING });
    const firebase = getFirebase();
    firebase
      .createUser(
        { email, password },
        {
          name: name,
          email: email,
          initial: name
            .split(" ")
            .map((item) => item[0])
            .join("")
            .toUpperCase(),
        }
      )
      .then((res) => {
        dispatch({ type: SIGN_UP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_ERROR, error: err });
      });
  };
};

// SIGN IN USER
// This action creator takes in the email and password of the person.
// The user is logged in and details are fetched from the database.
//
//
export const signInUser = ({ email, password }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: AUTH_LOADING });
    const firebase = getFirebase();
    firebase
      .login({ email, password })
      .then((res) => {
        dispatch({ type: SIGN_IN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGN_IN_ERROR, error: err });
      });
  };
};

// SIGN IN USER WITH GOOGLE
// This action creator logs the user in using the Google Sign in Provider.
//
export const googleSignIn = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: AUTH_LOADING });
    const firebase = getFirebase();
    firebase
      .login({ provider: "google", type: "popup" })
      .then((res) => {
        dispatch({ type: GOOGLE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: GOOGLE_ERROR, error: err });
      });
  };
};

// LOGOUT USER
// This action creator logs the user out of the application.
//
export const logoutUser = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const state = getState();
    const uid = state.firebase.auth.uid;
    const firestore = getFirestore();
    firestore.unsetListener({
      collection: `users/${uid}/notes`,
      orderBy: ["createdAt"],
    });
    firebase
      .logout()
      .then((res) => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_ERROR, error: err });
      });
  };
};
