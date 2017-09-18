#!/usr/bin/env node

// Import module dependencies
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
const routes = require('./routes/index');
const configurePassport = require('./configurePassport');

const app = express();

// configure express-session (cookie)
// secret is used to compute hash for the session. Hide it.
// resave, saveUnitialized = false - avoid race conditions for parallel requests
// IDEA: session store?
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
}));

// passport.js
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);

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


module.exports = app;
