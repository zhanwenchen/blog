import React, { Component } from 'react';
// import NavbarComponent from './../UIElements/NavbarComponent';
import NavbarComponent from './NavbarComponent';
import Message from './Message';
import Footer from './Footer';
import { Route } from 'react-router-dom';

export default class MainLayout extends Component {
  render() {
    return (
      <div className="container" id="container">
        <NavbarComponent className="col-xs-12" id="navbar" />
        <div className="content col-xs-12" id="content">
          <Message />
          {this.props.children}
        </div>
        <Footer id="footer col-xs-12"/>
      </div>
    )
  }
}
