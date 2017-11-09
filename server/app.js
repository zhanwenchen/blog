#!/usr/bin/env node

// CHANGED: merged ~/bin/www code with app
// CHANGED: use const for port utils to avoid function declaration hoisting
// IDEA: blog mention adding DEBUG=blog to package.json npm start script

// Import module dependencies
const express = require('express');
const expressJWT = require('express-jwt');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const debug = require('debug')('blog');
const bodyParser = require('body-parser');
const passport = require('passport');

const env = process.env.NODE_ENV || 'development';
debug(`env is ${env}`);
const config = require('./config')[env];
const models = require('./models');
const configurePassport = require('./passport/configurePassport');

const app = express();

// app.get('/protected',
//   expressJWT({ secret: config.jwtSecret }),
//   (req, res) => (!req.user.admin ? res.sendStatus(401) : res.sendStatus(200)));

// passport.js
app.use(passport.initialize());

configurePassport();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');

app.use('/', publicRoutes);
app.use('/private',
  expressJWT({ secret: config.jwtSecret }),
  privateRoutes); // valid token will be accessed via req.user

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {},
  });
});


// Normalize a port into a number, string, or false
const normalizePort = (portInput) => {
  const porty = parseInt(portInput, 10);

  if (isNaN(porty)) return portInput; // input is a string pipe

  if (porty >= 0) return porty; // input is a valid port number

  return false;
};

// Event handler for HTTP server 'error' event
// CHANGED: use const instead to avoid function declaration hoisting
const onError = (error) => {
  if (error.syscall !== 'listen') throw error;

  const porty = app.address;

  // TODO: fix onError
  const bind =
    typeof porty === 'string'
      ? `Pipe ${porty}`
      : `Port + ${porty}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Event handler for HTTP server 'listening' event.
const onListening = () => {
  const addr = app.address();
  const bind =
    typeof addr === 'string'
      ? `Pipe ${addr}`
      : `Port ${addr.port}`;

  debug(`Listening on ${bind}`);
};

// Get port from environment ad store it in Express
const port = normalizePort(config.port);
app.set('port', port);

// Create db tables in the database using data models
models.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      debug('Express server listening on port', port);
    });
    app.on('error', onError);
    app.on('listening', onListening);
  })
  .catch((err) => { throw err; });

app.models = models;

module.exports = app;
