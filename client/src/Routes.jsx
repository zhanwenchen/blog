/**
 * @file a central route configuring module for the client
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Base from './components/Base.jsx';
import Home from './components/Home.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignupPage from './containers/SignupPage.jsx';
import CreatePostPage from './containers/CreatePostPage.jsx';
import PostPage from './containers/PostPage.jsx';
import AllPostsPage from './containers/AllPostsPage.jsx';
import LogoutPage from './containers/LogoutPage.jsx'
// import UserPage from './';

/**
 * @function bounceIfNotLoggedIn
 * @description a helper method that wraps around the React Router
 * "getComponent" route option (that replaces the "component" option)
 * callback that conditionally returns a component to the route
 * @param {React.Component} protectedComponent - a react component
 * @return {function} a react
 * @example {path: '/protected', getComponent: protectedComponent(ProtectedPage)}
 */
const bounceIfNotLoggedIn = protectedComponent =>
  (location, callback) => {
    if (Auth.isTokenExist()) {
      callback(null, protectedComponent);
    } else {
      callback(null, LoginPage);
    }
  };

const Routes = () => (
  <Base>
    <Switch>
      <Route exact path="/" render={Home} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/posts" component={AllPostsPage} />
      <Route exact path="/posts/new" component={CreatePostPage} />
      <Route exact path="/posts/:stringId" component={PostPage} />
      <Route exact pathh="/logout" component={LogoutPage} />
    </Switch>
  </Base>
);

export default Routes;
