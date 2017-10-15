// App.js
import React from 'react';
import MainLayout from './components/MainLayout';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="container app">
        <MainLayout>
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
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

export default App;
