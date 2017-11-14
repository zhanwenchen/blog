import React from 'react';
import Auth from '../modules/Auth';

export default class LogoutPage extends React.Component {
  componentWillMount() {
    Auth.removeToken();
    this.props.history.push('/');
  }

  render() {
    return (
      <h1>Logging you out...</h1>
    );
  }
}
