import { useState } from "react";
import "../NewNote.css";
import Dropzone from "react-dropzone";
import { useFirebase } from "react-redux-firebase";
import { Formik } from "formik";
import * as Yup from "yup";

const filesPath = "userUploads";

const NewImage = (props) => {
  const firebase = useFirebase();
  const [imageURL, setImageURL] = useState("");
  const [isImageUploading, setImageUploading] = useState(false);
  const [hasMissingImage, setMissingImage] = useState(false);

  const handleSubmit = (data, { resetForm }) => {
    console.log(props);

    if (!imageURL) {
      setMissingImage(true);
      return;
    }
    props.addNote(null, data.content, imageURL);
    resetForm({ values: "" });
    setImageURL("");
  };

  function onFilesDrop(files) {
    setImageUploading(true);
    firebase
      .uploadFile(filesPath, files[0])
      .then(async (res) => {
        console.log(res);
        // Get download URl
        const URL = await firebase
          .storage()
          .ref(filesPath)
          .child(res.uploadTaskSnapshot.ref.name)
          .getDownloadURL();
        setImageURL(URL);
        setImageUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setImageUploading(false);
      });
  }

  return (
    <div>
      <span className="card-title new-note-card-title">Add New Image</span>
      <p className="new-note-description">Add a new image to your collection</p>
      <div className="card-content new-note-card-content">
        {imageURL && !isImageUploading ? (
          <img src={imageURL} alt="Uploaded" style={{ width: "100%" }} />
        ) : imageURL === "" && !isImageUploading ? (
          <div className="dropzone-container">
            <Dropzone onDrop={onFilesDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="dropzone-text">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} className="dropzone-input" />
                    <p>
                      Drag and drop an image here, or click to select an image
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        ) : (
          <div className="row right-align">
            <div className="loader"></div>
          </div>
        )}
        {hasMissingImage && (
          <p className="red-text image-error">
            Please upload an image to continue.
          </p>
        )}
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={Yup.object({
            content: Yup.string()
              .min(20, "Please enter some valid content.")
              .required("Some Content for the note is required."),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <textarea
                  id="content"
                  className={[
                    "materialize-textarea",
                    errors.content && touched.content
                      ? "invalid"
                      : touched.content && !errors.content
                      ? "valid"
                      : "",
                  ].join(" ")}
                  value={values.content}
                  onBlur={handleBlur}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="content">Content</label>
                <span
                  className="helper-text"
                  data-error={errors.content}
                ></span>
              </div>
              {/* Add Notes Error */}
              {props.addNotesError ? (
                <div className="row center-align">
                  <p className="red-text">
                    {props.addNotesError.name + ": " + props.addNotesError.code}
                  </p>
                </div>
              ) : null}
              {/* Add Notes Loading */}
              {props.isLoading ? (
                <div className="row right-align">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="row right-align">
                  <button
                    className="btn z-depth-2 hoverable waves-effect indigo darken-1 waves-light"
                    type="submit"
                    name="action"
                  >
                    Done
                    <i className="material-icons right">check</i>
                  </button>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewImage;
