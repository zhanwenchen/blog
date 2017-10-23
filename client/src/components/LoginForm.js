import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

// TODO: change server from form urlencoded to json across the board
// const serverUrl = 'http://localhost:3000'; // TODO: change this
const loginRoute = '/api/login';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();

    alert('LoginForm.js: about to fetch', serverUrl + loginRoute);

    fetch(serverUrl + loginRoute, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });
  }

  render() {
    return (
      <Form>
        <FormGroup controlId="formEmail">
          <ControlLabel>Email:</ControlLabel>
          <FormControl
            type="username"
            ref="username"
            onChange={this.handleInputChange}
            placeholder="Email"
          />
        </FormGroup>
        <br />
        <FormGroup controlId="formPassword">
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="password"
            ref="password"
            onChange={this.handleInputChange}
            placeholder="Password"
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Login</Button>
      </Form>
    );
  }
}
