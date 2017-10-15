import React, { Component } from 'react';
// import NavbarComponent from './../UIElements/NavbarComponent';
import NavbarComponent from './NavbarComponent';
import Message from './Message';
import Footer from './Footer';
import { Route } from 'react-router-dom';

class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <NavbarComponent />
        <Message />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default MainLayout;
