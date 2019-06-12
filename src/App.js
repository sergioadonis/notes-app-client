import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Form, Button, Container } from "react-bootstrap";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <Container className="App">
          <Navbar collapseOnSelect>
            <Navbar.Brand as={Link} to="/">
              Scratch
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {this.state.isAuthenticated ? (
                <Form inline className="ml-auto">
                  <Button onClick={this.handleLogout} variant="light">
                    Logout
                  </Button>
                </Form>
              ) : (
                <Nav className="ml-auto">
                  <Nav.Link as={NavLink} to="/signup">
                    Signup
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Routes childProps={childProps} />
        </Container>
      )
    );
  }
}

export default withRouter(App);
