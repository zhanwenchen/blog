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

// TODO: deprecate configurePassport.js and move functionalities into route handlers
// IDEA for blog: use async bcrypt algo instead of sync. Tutorials are wrong because they use mongodb. Better not tie up your node.js io. Source: https://stackoverflow.com/questions/11605943/async-or-sync-bcrypt-function-to-use-in-node-js-in-order-to-generate-hashes. More on bcrypt sync vs async: https://www.npmjs.com/package/bcrypt
// IDEA for blog: point - don't store the salt in the db. Here's why: https://stackoverflow.com/questions/277044/do-i-need-to-store-the-salt-with-bcrypt. More on bcrypt salt here: https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');
const debug = require('debug');

const saltRounds = 10;

const createUser = (userData, done) => {
  models.User.create(userData)
    .then((newUser) => {
      // REVIEW: what are the params for the callback?
      // REVIEW: return done? or just call done()?
      if (newUser) {
        debug('In configurePassport.createUser. newUser was created. newUser is ', newUser);
        return done(null, newUser);
      }
      debug('In configurePassport.createUser. newUser was NOT created.');
      return done(null, false);
    })
    .catch(error => done(error, false, { message: 'error in local-signup' }));
};

const findOrCreateUser = (req, username, password, done) => {
  models.User.findOne({ where: { username } })
    .then((user) => {
      if (user) {
        return done(null, false, {
          message: `username ${username} is already taken`,
        });
      }

      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        const userData = {
          username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: hash,
        };

        createUser(userData, done);
        debug('In configurePassport.findOrCreateUser. Just invoked createUser and program did not terminate. ')
      })

      // return done(null, true, { message: 'error in local-signup' });
    })
    .catch(error => done(error, false, { message: 'error in local-signup' }));
};

const signupStrategy = new LocalStrategy({ passReqToCallback: true }, findOrCreateUser);

const findUser = (req, username, password, done) => {
  models.User.findOne({ where: { username } })
    .then((possibleUser) => {
      if (!possibleUser) {
        return done(null, false, { message: 'Email does not exist' });
      }

      bcrypt.compare(password, possibleUser.password, (err, res) =>
        done(null, res, { message: res ? 'Correct Password' : 'Incorrect Password' })
      );

      return done(null, possibleUser.get());
    })
    .catch(err => done(err, false, { message: 'Something went wrong with your signin' }));
};

const loginStrategy = new LocalStrategy({ passReqToCallback: true }, findUser);

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
  // Only put user.id into session because otherwise leak user info and impact
  // performance. Although if some user information is repetitively needed,
  // having frequently requested info in session could improve performance.
  passport.serializeUser((user, done) => {
    // FIXME: passport error: user cannot be serialized
    debug('in serializeUser');
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

  passport.use('local-signup', signupStrategy);

  passport.use('local-login', loginStrategy);
};
