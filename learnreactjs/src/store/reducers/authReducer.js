import {
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    AUTH_LOADING,
    SIGN_UP_ERROR,
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    GOOGLE_SUCCESS,
    GOOGLE_ERROR,
  } from "../actions/authActions";
  
  const initState = {
    authError: null,
    authLoading: false,
    signInError: null,
    googleAuthError: null,
  };
  
  const authReducer = (state = initState, action) => {
    switch (action.type) {
      // Loading
      case AUTH_LOADING:
        return {
          ...state,
          authLoading: true,
        };
      // SIGN UP CASES
      case SIGN_UP_SUCCESS:
        return {
          ...state,
          authLoading: false,
          signInError: null,
          authError: null,
        };
      case SIGN_UP_ERROR:
        return {
          ...state,
          authLoading: false,
          authError: action.error,
        };
      // SIGN IN CASES
      case SIGN_IN_SUCCESS:
        return {
          ...state,
          signInError: null,
          authLoading: false,
          authError: null,
        };
      case SIGN_IN_ERROR:
        return {
          ...state,
          authLoading: false,
          signInError: action.error,
        };
      // GOOGLE CASES
      case GOOGLE_SUCCESS:
        return {
          ...state,
          authLoading: false,
          googleAuthError: null,
        };
      case GOOGLE_ERROR:
        return {
          ...state,
          authLoading: false,
          googleAuthError: action.error,
        };
      // LOGOUT CASES
      case LOGOUT_SUCCESS:
        return {
          ...state,
          authError: null,
          singInError: null,
          logoutError: null,
        };
      case LOGOUT_ERROR:
        return {
          ...state,
          logoutError: action.error,
        };
      default:
        return {
          ...state,
        };
    }
  };
  
  export default authReducer;
  