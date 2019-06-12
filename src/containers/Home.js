import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const notes = await this.notes();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return API.get("notes", "/notes");
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <ListGroupItem
          action
          key={note.noteId}
          as={Link}
          to={`/notes/${note.noteId}`}
        >
          <h3 className="mb-0">{note.content.trim().split("\n")[0]}</h3>
          <small>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </small>
        </ListGroupItem>
      ) : (
        <ListGroupItem action key="new" as={Link} to="/notes/new">
          <h4>
            <FontAwesomeIcon icon={["fas", "edit"]} /> Create a new note
          </h4>
        </ListGroupItem>
      )
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <h1 className="pb-2 my-4 border-bottom">Your Notes</h1>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
