// App.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './views/Home';
import Login from './views/Login';
import CreatePost from './views/CreatePost';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container app" id='app'>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/create-post" component={CreatePost} />
            {/* <Route path="/login" exact component={Login} />
            <Route path="/" component={Login} /> */}
            {/* <Route path="/signin" exact component={Login} /> */}
            {/* <Route path="/signon" exact component={Login} /> */}
            {/* <Route path="/about" exact component={About} /> */}
            {/* <Route path="/privacy" exact component={Privacy} /> */}
            {/* <Route path="/composers" exact component={Composers} /> */}
            {/* <Route path="/composers/:artist_id" exact component={Composer} /> */}
          </Switch>
        </MainLayout>
      </div>
    );
  }
}
