import React, { Component } from 'react';
// import NavbarComponent from './../UIElements/NavbarComponent';
import NavbarComponent from './NavbarComponent';
import Message from './Message';
import Footer from './Footer';
import { Route } from 'react-router-dom';

export default class MainLayout extends Component {
  render() {
    return (
      <div className="col-xs-12 container" id="container">
        <NavbarComponent id="navbar" />
        <div className="content" id="content">
          <Message />
          {this.props.children}
        </div>
        <Footer id="footer"/>
      </div>
    )
  }
}
