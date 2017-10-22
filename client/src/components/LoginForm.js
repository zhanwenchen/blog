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

  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <label>
  //         Email:
  //         <input
  //           name="username"
  //           type="text"
  //           valur={this.state.username}
  //           onChange={this.handleInputChange} />
  //       </label>
  //       <br />
  //       <label>
  //         Password:
  //         <input
  //           name="password"
  //           type="password"
  //           value={this.state.password}
  //           onChange={this.handleInputChange} />
  //       </label>
  //       <submit />
  //     </form>
  //   );
  // }
  render() {
    const {errorMessage} = this.props

    return (
      <Form>
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel>Email </ControlLabel>
          <FormControl type="username" ref="username" onChange={this.handleChange} placeholder="Email" />
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <ControlLabel>Password </ControlLabel>
          <FormControl type="password" ref="password" onChange={this.handleChange} placeholder="Password" />
        </FormGroup>
        <Button onClick={(event) => this.handleSubmit(event)}>Login</Button>
        {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
      </Form>
    )
  }
}
