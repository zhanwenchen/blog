/*eslint-disable*/

'use strict';
/**
 * test-login.js
 * Log
 * TODO: add more result assertions to test cases
 * TODO: blog article mention: avoid arrow functions in chai. Use function declarations instead due to "this" binding in chai.
 */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const debug = require('debug')('blog');

const { postUserFormToPromise, defaultTesterAccount } = require('./utils');

const should = chai.should();

chai.use(chaiHttp);

describe('Signup', function() {

  before((done) => {
    app.models.User.destroy({ where: { username: defaultTesterAccount.username } })
      .then((lol) => {
        app.models.User.sync();
      })
      .then(done, done);
  });

  after((done) => {
    app.models.User.destroy({ where: { username: defaultTesterAccount.username } })
      .then((lol) => {
        app.models.User.sync();
      })
      .then(done, done);
  });

  it('should add new user in database on POST /signup', async () => {
    try {
      const res = await postUserFormToPromise('/signup', defaultTesterAccount);
      res.should.have.status(200);
      res.should.be.json;

      const user = await app.models.User.findOne({ where: { username: defaultTesterAccount.username } });
      user.should.be.a('object');
      user.username.should.equal(defaultTesterAccount.username);
      user.firstName.should.equal(defaultTesterAccount.firstName);
      user.lastName.should.equal(defaultTesterAccount.lastName);
    } catch (error) {
      debug(error);
      throw error;
    }
  });
  // TODO:
  // it('should NOT add duplicate user in database on POST /signup', function(done) {
  //   debug('Testing POST /signup. Invoking chai request')
  //   chai.request(app)
  //     .post('/signup')
  //     .type('form')
  //     .send(testerAccount)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       app.models.User.findOne({ where: { username: testerAccount.username } })
  //         .then((user) => {
  //           user.should.be.a('object');
  //           user.username.should.equal(testerAccount.username);
  //           user.firstName.should.equal(testerAccount.firstName);
  //           user.lastName.should.equal(testerAccount.lastName);
  //         })
  //       done();
  //     })
  // });

  it('should log in with new user in database on /login POST', async () => {
    try {
      const res = await postUserFormToPromise('/login', defaultTesterAccount);
      res.should.have.status(200);
      res.should.be.json;

      const user = res.res.body;
      user.should.have.property('username', defaultTesterAccount.username);
      user.should.not.have.property('firstName');
      user.should.not.have.property('lastName');
    } catch (error) {
      debug(error);
      throw error;
    }
  });

  // TODO
  // it('should NOT log in with wrong user password on /login POST', function(done) {
  //   chai.request(app)
  //     .post('/login')
  //     .type('form')
  //     .send(testerAccount)
  //     .end((err, res) => {
  //       // debug(Object.keys(res))
  //       // debug(res.res.body.username)
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.should.be.a('object');
  //       res.res.body.should.have.property('username');
  //       res.res.body.username.should.equal(testerAccount.username);
  //       done();
  //     });
  // });
});
