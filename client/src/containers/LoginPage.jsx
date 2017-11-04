import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';

const LOGIN_URL = '/api/login';

class LoginPage extends React.Component {
  /** @constructor */
  constructor(props) {
    super(props);

    const existingSuccessMessage = localStorage.getItem('successMessage');

    let successMessage = '';

    if (existingSuccessMessage) {
      successMessage = existingSuccessMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
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

    const data = encodeURIComponent(JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    }));

    fetch(LOGIN_URL, {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        switch (response.status) {
          case 200: {
            this.setState({
              errors: {},
            });
            if ('token' in response) {
              Auth.setToken(response.token);
            } else {
              throw new Error('No token in response', response);
            }
            break;
          }
          default: {
            const responseJson = response.json();
            const errors = responseJson.erros ? responseJson.erros : {};
            errors.summary = responseJson.message;

            this.setState({
              errors,
            });
          }
        }
      });
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
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }
}

export default LoginPage;
