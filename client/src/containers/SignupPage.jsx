import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../components/SignupForm.jsx';

const SIGNUP_URL = '/api/signup';

class SignupPage extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);

    // set the initial comonent state
    this.state = {
      errors: {},
      user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      },
    };

    /**
     * processForm and changeUser have a fixed "this"
     * (an instance of SignupPage) wherever they end up.
     * Otherwise when they are called in the DOM,
     * "this" will be the DOM "Window" instance, where
     * "Window.processForm" and "Window.changeUser"
     * will be "undefined".
     */
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * @function changeUser
   * @description Change the user object
   * @param {Object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  /**
   * @function processForm
   * @description process the form
   * @param {Object} event - the JavaScript event Object
   */
  processForm(event) {
    // prevent default action. In this case, action is the form submission
    event.preventDefault();

    const data = JSON.stringify({
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      email: this.state.user.email,
      password: this.state.user.password,
    });

    fetch(SIGNUP_URL, {
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
                localStorage.setItem('successMessage', responseJson.message);
                // redirect to login
                this.context.router.replace('/login');
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
  * @function render
  *
  */
  render() {
    return (
      <SignupForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default SignupPage;
