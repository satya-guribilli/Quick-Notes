import { Formik } from "formik";
import * as Yup from "yup";
import React, { Component } from "react";
import "../NewNote.css";

class NewTextNote extends Component {
  handleSubmit = (data, { resetForm }) => {
    console.log(data);
    this.props.addNote(data.title, data.content, null);
    resetForm({ values: "" });
  };

  render() {
    return (
      <div>
        <span className="card-title new-note-card-title">Add New Note</span>
        {this.props.currentDescription}
        <div className="card-content new-note-card-content">
          <Formik
            initialValues={{ title: "", content: "" }}
            validationSchema={Yup.object({
              title: Yup.string()
                .min(3, "Please enter a valid title.")
                .required("A title for the note is required."),
              content: Yup.string()
                .min(20, "Please enter some valid content.")
                .required("Some Content for the note is required."),
            })}
            onSubmit={this.handleSubmit}
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
                  <input
                    id="title"
                    type="text"
                    className={
                      errors.title && touched.title
                        ? "invalid"
                        : touched.title && !errors.title
                        ? "valid"
                        : ""
                    }
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <label htmlFor="title">Title</label>
                  <span
                    className="helper-text"
                    data-error={errors.title}
                  ></span>
                </div>
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
                {this.props.addNotesError ? (
                  <div className="row center-align">
                    <p className="red-text">
                      {this.props.addNotesError.name +
                        ": " +
                        this.props.addNotesError.code}
                    </p>
                  </div>
                ) : null}
                {/* Add Notes Loading */}
                {this.props.isLoading ? (
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
  }
}

export default NewTextNote;
