import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';

const LOGIN_URL = '/api/login';

class LoginPage extends React.Component {
  /** @constructor */
  constructor(props, context) {
    super(props, context);

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

    const data = JSON.stringify({
      email: this.state.user.email,
      password: this.state.user.password,
    });

    fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data,
    })
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });
                if ('token' in responseJson) {
                  Auth.setToken(responseJson.token);
                } else {
                  throw new Error('No token in response', responseJson);
                }
                this.context.router.replace('/');
                break;
              }
              default: {
                const errors = responseJson.errors ? responseJson.errors : {};
                errors.summary = responseJson.message;

                this.setState({
                  errors,
                });
              }
            }
          });
      })
      .catch((error) => { throw error; });
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

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default LoginPage;
