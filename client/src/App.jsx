import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes.jsx';
import './App.css';

// remove tap delay, essential for MaterialUI to work properly
// injectTapEventPlugin();
//
// ReactDom.render(
//   (
//     <MuiThemeProvider muiTheme={getMuiTheme()}>
//       <Router history={browserHistory} routes={routes} />
//     </MuiThemeProvider>
//   ),
//   document.getElementById('react-app'),
// );

ReactDom.render(
  (
    <BrowserRouter>
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    </BrowserRouter>
  ),
  document.getElementById('react-app'),
);
