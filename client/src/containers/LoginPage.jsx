import React from 'react';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends React.Component {
  /** @constructor */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
  * @function processForm
  * @param {Object} event - JavaScript event object
  */
  processForm(event) {
    // prevent default action. In this case, action is the form submission
    event.preventDefault();
  }

  /**
  * @function changeUser
  * @param {Object} event - the JavaScript DOM event object
  */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
