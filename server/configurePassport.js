// Lynda Chiwetelu: Using Passport With Sequelize and MySQL
// Tutorial: https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
// Github: https://github.com/lyndachiwetelu/using-passport-with-sequelize-and-mysql

// Understanding passport.js auth flow:
// http://toon.io/understanding-passportjs-authentication-flow/

// same passport instance as in app.js because passport is a singleton
// don't need to pass around passport between app.js and here, unlike
// Lynda Chiwetelu's example


// function verified(err, user, info) {
//     if (err) { return self.error(err); }
//     if (!user) { return self.fail(info); }
//     self.success(user, info);
//   }
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');

// IDEA: move these functions inside User model?
const generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const isValidPassword = (userpass, password) =>
  bcrypt.compareSync(password, userpass);

/**
* @param passport
*/

// IDEA: idea for blog: user does not need to be passed around either
// CHANGED: removed passport, user from Lynda Chiwetelu's example because those
//          are singletons
// BLOG: done(error, validationResult, message?) completes the authentication
//        process. validationResult != false => authentication success
module.exports = () => {
  // serializeUser stores specified user info in the session
  // calling done(null, userInfo) in serializeUser causes
  // 1. req.session.passport.user = { // our serialised user object // }
  // 2. The result is also attached to the request as req.user
  // done() also invokes requestHandler
  // passport/Authenticator.prototype.serializeUser() is a setter
  // result: req.session.passport.user = {id:'..'}

  // REVIEW: what is the first argument? a generic user or the user model????
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // console.log(req);

  // get the user from our database and store it in req.user.
  // query db and pass user to done

  // passport/Authenticator.prototype.deserializeUser() is a setter
  // result: user object attaches to the request as req.user
  passport.deserializeUser((id, done) => {
    models.User.findById(id)
      .then((user) => {
        if (user) done(null, user.get()); else done(user.errors, null);
      })
      .catch((err) => { if (err) done(null, false); });
  });

  // req.email = usernameField, req.passwordhash = passwordField
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // these are fields in req.param
        usernameField: 'email',
        passwordField: 'passwordSupplied',
        // allows us to pass back the entire request to the following callback
        passReqToCallback: true,
      },
      (req, email, passwordSupplied, done) => {
        models.User.findOne({ where: { email } })
          .then((user) => {
            if (user) {
              return done(null, false, {
                message: `Email ${email} is already taken`,
              });
            }

            models.User.create(
              {
                email,
                password: generateHash(passwordSupplied),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
              })
              .then((newUser) => {
                // REVIEW: what are the params for the callback?
                // REVIEW: return done?
                if (newUser) {
                  return done(null, newUser);
                }
                return done(null, false);
              })
              .catch(error => done(error, false, { message: 'error in local-signup' }));

            return done(new Error('error'), false, { message: 'error in local-signup' });
          })
          .catch(error => done(error, false, { message: 'error in local-signup' }));
      }
    )
  );


  passport.use(
    'local-signin',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        // allows us to pass back the entire request to the callback
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        models.User.findOne({ where: { email } })
          .then((possibleUser) => {
            if (!possibleUser) {
              return done(null, false, { message: 'Email does not exist' });
            }

            if (!isValidPassword(possibleUser.password, password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, possibleUser.get());
          })
          .catch(err =>
            done(err, false, { message: 'Something went wrong with your signin' }));
      }
    )
  );
};
