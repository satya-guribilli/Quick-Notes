import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NewNote from "../../Components/NewNote/NewNote";
import NotesList from "../../Components/NotesList/NotesList";
import { NOTES_ROUTE } from "../../routes";
import {
  addDemoNote,
  deleteDemoNote,
  updateDemoNote,
} from "../../store/actions/demoNotesActions";

class Demo extends Component {
  render() {
    const { auth } = this.props;
    if (auth.uid) {
      return <Redirect to={NOTES_ROUTE} />;
    }
    return (
      <div>
        <NewNote addNote={(data) => this.props.addNote(data)} />
        <NotesList
          notes={this.props.notes}
          deleteNote={this.props.deleteNote}
          updateNote={this.props.updateNote}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    notes: state.demo.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addDemoNote(note)),
    deleteNote: (id) => dispatch(deleteDemoNote(id)),
    updateNote: (id, isDone) => dispatch(updateDemoNote(id, isDone)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
