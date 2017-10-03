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

// debug.log = console.info.bind(console);

const should = chai.should();

chai.use(chaiHttp);

const testerAccount = {
  firstName: 'tester',
  lastName: 'lol',
  username: 'tester1@test.com',
  password: 't3st3r1',
};

describe('Signup', function() {
  before(function(done) {
    app.models.User.destroy({ where: { username: testerAccount.username } })
      .then(() => {
        app.models.User.sync();
      })
      .then(done, done);
  });

  after(function(done) {
    app.models.User.destroy({ where: { username: testerAccount.username } })
      .then(() => {
        app.models.User.sync();
      })
      .then(done, done);
  });

  it('should add new user in database on POST /signup', function(done) {
    debug('Testing POST /signup. Invoking chai request')
    chai.request(app)
      .post('/signup')
      .type('form')
      .send(testerAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        app.models.User.findOne({ where: { username: testerAccount.username } })
          .then((user) => {
            user.should.be.a('object');
            user.username.should.equal(testerAccount.username);
            user.firstName.should.equal(testerAccount.firstName);
            user.lastName.should.equal(testerAccount.lastName);
          })
        done();
      })
  });

  it('should log in with new user in database on /login POST', function(done) {
    chai.request(app)
      .post('/login')
      .type('form')
      .send(testerAccount)
      .end((err, res) => {
        // debug(Object.keys(res))
        // debug(res.res.body.username)
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.res.body.should.have.property('username');
        res.res.body.username.should.equal(testerAccount.username);
        done();
      });
  });
});
