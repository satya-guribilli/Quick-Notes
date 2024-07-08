import {
    ADD_DEMO_NOTE,
    DELETE_DEMO_NOTE,
    UPDATE_DEMO_NOTE,
  } from "../actions/demoNotesActions";
  
  const initialState = {
    notes: [
      {
        id: "12345",
        title: "Hello World",
        content:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio quia magnam temporibus voluptatum vero dolorem assumenda praesentium, saepe reiciendis. Perspiciatis sed consequuntur corrupti. Voluptates blanditiis suscipit voluptatem saepe sapiente velit.",
        createdAt: Date.now().toString(),
      },
    ],
  };
  
  const demoReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_DEMO_NOTE:
        const newNote = {
          title: action.note.title,
          content: action.note.content,
          id:
            Date.now().toString() +
            (Math.floor(Math.random() * 1000) + 1).toString(),
          createdAt: Date.now().toString(),
        };
        return { ...state, notes: [...state.notes, newNote] };
      case DELETE_DEMO_NOTE:
        const newNotes = state.notes.filter((note) => note.id !== action.id);
        return {
          ...state,
          notes: newNotes,
        };
      case UPDATE_DEMO_NOTE:
        const updatedNotes = state.notes.map((note) => {
          if (note.id === action.id) {
            return { ...note, isDone: action.isDone };
          } else {
            return note;
          }
        });
        return {
          ...state,
          notes: updatedNotes,
        };
      default:
        return state;
    }
  };
  
  export default demoReducer;
  