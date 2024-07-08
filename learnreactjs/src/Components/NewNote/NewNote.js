import React, { Component } from "react";
import "./NewNote.css";
import { connect } from "react-redux";
import NewTextNote from "./NewTextNote/NewTextNote";
import NewImage from "./NewImage/NewImage";

class NewNote extends Component {
  state = {
    currentTab: "note",
  };

  descriptions = [
    <p className="new-note-description">
      Go ahead and write down your thoughts. This way you won't forget that{" "}
      <span className="new-note-description-bold">"Million Dollar Idea"</span>.
    </p>,
    <p className="new-note-description">
      Write down your thoughts here. Alternatively, you can randomly mash your
      keyboard keys to test this out.
    </p>,
    <p className="new-note-description">
      You know how this works right? Fill out the text fields and click the
      button. <span className="new-note-description-bold">EASY</span>.
    </p>,
    <p className="new-note-description">
      Hint: refresh this page to see a different description :)
    </p>,
    <p className="new-note-description">
      Here's some text for you to copy and paste into the fields below. <br />{" "}
      Title: Hello World! (obviously) <br />
      Content: Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>,
  ];

  componentDidMount() {
    this.setState({
      ...this.state,
      currentDescription: this.descriptions[Math.floor(Math.random() * 5)],
    });
  }

  handleTabChange = (tab) => {
    this.setState({
      ...this.state,
      currentTab: tab,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card new-note-card">
              <div className="row">
                <button
                  className={[
                    "waves-effect col s6 waves-blue",
                    this.state.currentTab === "note"
                      ? "white-text indigo darken-1 btn"
                      : "btn-flat",
                  ].join(" ")}
                  onClick={() => this.handleTabChange("note")}
                >
                  Add Note
                </button>
                <button
                  className={[
                    "waves-effect col s6 waves-blue btn-flat",
                    this.state.currentTab === "image"
                      ? "white-text indigo darken-1 btn"
                      : "btn-flat",
                  ].join(" ")}
                  onClick={() => this.handleTabChange("image")}
                >
                  Add Image
                </button>
              </div>
              {this.state.currentTab === "note" ? (
                <NewTextNote
                  currentDescription={this.state.currentDescription}
                  addNote={this.props.addNote}
                  isLoading={this.props.isLoading}
                  addNotesError={this.props.addNotesError}
                />
              ) : (
                <NewImage
                  uploadImage={this.props.uploadImage}
                  addNote={this.props.addNote}
                  isLoading={this.props.isLoading}
                  addNotesError={this.props.addNotesError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.userNotes.addNotesLoading,
    addNotesError: state.userNotes.addNotesError,
  };
};

export default connect(mapStateToProps)(NewNote);
