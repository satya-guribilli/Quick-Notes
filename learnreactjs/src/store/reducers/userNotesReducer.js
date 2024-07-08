import {
    ADD_USER_NOTE_ERROR,
    ADD_USER_NOTE_SUCCESS,
    LOADING_ADD_NOTE,
    LOADING_GET_NOTES,
    STOP_LOADING_GET_NOTES,
  } from "../actions/userNotesActions";
  
  const initialState = {
    addNotesLoading: false,
    addNotesError: null,
    loadingGetNotes: false,
    getNotesError: false,
  };
  
  const userNotesReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING_ADD_NOTE:
        return {
          ...state,
          addNotesLoading: true,
        };
      case ADD_USER_NOTE_SUCCESS:
        return {
          ...state,
          addNotesLoading: false,
          addNotesError: null,
        };
      case ADD_USER_NOTE_ERROR:
        return {
          ...state,
          addNotesLoading: false,
          addNotesError: action.error,
        };
      case LOADING_GET_NOTES:
        return {
          ...state,
          loadingGetNotes: true,
        };
      case STOP_LOADING_GET_NOTES:
        return {
          ...state,
          loadingGetNotes: false,
        };
      default:
        return state;
    }
  };
  
  export default userNotesReducer;
  