export const LOADING_ADD_NOTE = "LOADING_ADD_NOTE";
export const ADD_USER_NOTE_SUCCESS = "ADD_USER_NOTE_SUCCESS";
export const ADD_USER_NOTE_ERROR = "ADD_USER_NOTE_ERROR";

export const LOADING_GET_NOTES = "LOADING_NOTES";
export const STOP_LOADING_GET_NOTES = "STOP_LOADING_GET_NOTES";

export const addUserNote = (title, content, imageURL) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: LOADING_ADD_NOTE });
    const state = getState();
    const uid = state.firebase.auth.uid;
    const firestore = getFirestore();
    let data = {};
    const id =
      Date.now().toString() + (Math.floor(Math.random() * 1000) + 1).toString();
    if (title) {
      data = {
        title: title,
        content: content,
        createdAt: firestore.FieldValue.serverTimestamp(),
        id: id,
      };
    } else {
      data = {
        content: content,
        imageURL: imageURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
        id: id,
      };
    }
    console.log(data);
    firestore
      .set({ collection: `users/${uid}/notes`, doc: id }, data)
      .then((res) => {
        dispatch({ type: ADD_USER_NOTE_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: ADD_USER_NOTE_ERROR, error: err });
      });
  };
};

export const getUserNotes = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: LOADING_GET_NOTES });
    const firestore = getFirestore();
    firestore.setListener({
      collection: `users/${uid}/notes`,
      orderBy: ["createdAt"],
    });
  };
};

export const deleteUserNote = (noteID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    const firestore = getFirestore();
    firestore
      .delete({ collection: `users/${uid}/notes`, doc: noteID })
      .then((res) => {})
      .catch((err) => {});
  };
};

export const updateUserNote = (noteID, isDone) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    const firestore = getFirestore();
    firestore
      .update(
        { collection: `users/${uid}/notes`, doc: noteID },
        { isDone: isDone }
      )
      .then((res) => {})
      .catch((err) => {});
  };
};

export const uploadUserImage = (image) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const uid = state.firebase.auth.uid;
    const firebase = getFirebase();
    firebase
      .uploadFile(
        `users/${uid}/images/${image.name}`,
        image,
        `users/${uid}/images/${image.name}`
      )
      .then((res) => {
        console.log(res);
        res.getDownloadURL().then((url) => {
          const firestore = getFirestore();
          const id =
            Date.now().toString() +
            (Math.floor(Math.random() * 1000) + 1).toString();
          firestore
            .set(
              { collection: `users/${uid}/images`, doc: id },
              {
                url: url,
                createdAt: firestore.FieldValue.serverTimestamp(),
                id: id,
              }
            )
            .then((res) => {})
            .catch((err) => {});
          console.log(url);
        });
      })
      .catch((err) => {});
  };
};
