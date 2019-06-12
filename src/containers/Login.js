import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";

import LoaderButton from "../components/LoaderButton";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "admin@example.com",
      password: "Passw0rd!"
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false, password: "" });
    }
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              size="lg"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              size="lg"
            />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            disabled={!this.validateForm()}
            type="submit"
            variant="primary"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          >
            Login
          </LoaderButton>
        </Form>
      </div>
    );
  }
}
