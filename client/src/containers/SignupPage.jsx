import React from 'react';
import SignupForm from '../components/SignupForm.jsx';

class SignupPage extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);

    // set the initial comonent state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * @function changeUser
   * @description Change the user object
   * @param {Object} event - the JavaScript event object
   */
  changeUser(event) {
    const { name, user } = event.target;
    user[name] = event.target.value;

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

    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
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

export default SignupPage;
