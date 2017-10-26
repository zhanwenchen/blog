import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './views/Home';
import Login from './views/Login';
import CreatePost from './views/CreatePost';
import './App.css';

const App = () => (
  <div className="container app" id="app">
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/create-post" component={CreatePost} />
      </Switch>
    </MainLayout>
  </div>
);

export default App;
