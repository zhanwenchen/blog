// Lynda Chiwetelu: Using Passport With Sequelize and MySQL
// Tutorial: https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
// Github: https://github.com/lyndachiwetelu/using-passport-with-sequelize-and-mysql

// understanding passport.js auth flow:
// http://toon.io/understanding-passportjs-authentication-flow/

// same passport instance as in app.js because passport is a singleton
// don't need to pass around passport between app.js and here, unlike
// Lynda Chiwetelu's example
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

// TODO: move these functions inside User model?
const generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

const isValidPassword = (userpass, password) =>
  bcrypt.compareSync(password, userpass);

/**
* @param passport
* @param user
*/
module.exports = (user) => {

  const User = user; //TODO: necessary? copy to avoid changing user object forever?

  // serializeUser stores specified user info in the session
  // calling done(null, userInfo) in serializeUser causes
  // 1. req.session.passport.user = { // our serialised user object // }
  // 2. The result is also attached to the request as req.user
  // done() also invokes requestHandler
  //passport/Authenticator.prototype.serializeUser() is a setter
  // result: req.session.passport.user = {id:'..'}
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // console.log(req);

  // get the user from our database and store it in req.user.
  // query db and pass user to done

  //passport/Authenticator.prototype.deserializeUser() is a setter
  // result: user object attaches to the request as req.user
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        if (user) done(null, user.get()); else done(user.errors, null);})
      .catch(err => { done(null, false); });
  });

  // req.email = usernameField, req.passwordhash = passwordField
  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'passwordhash',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    }, (req, email, passwordhash, done) => {
      // import User model?
      User.findOne({ where: { email: email } })
        .then((user) => {
          if(user) return done(null, false, {message : 'That email is already taken'});

          User.create({
            email: email,
            password: generateHash(password),
            firstname: req.body.firstname,
            lastname: req.body.lastname
          }).then((newUser, created) =>
            if (user) done(null, newUser) else done(null, false);
          );
        }
      })
    )
  );

  passport.use('local-signin', new LocalStrategy({

    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {

    const User = user; // TODO: necessary?

    User.findOne({ where : { email: email } })
      .then(user => {

        if (!user) return done(null, false, { message: 'Email does not exist' });

        if (!isValidPassword(user.password, password))
          return done(null, false, { message: 'Incorrect password.' });

        return done(null, user.get());

      }).catch(err => done(null, false, { message: 'Something went wrong with your Signin' }));
    }
  )
);

};
