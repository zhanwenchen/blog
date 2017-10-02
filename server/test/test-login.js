/**
 * test-login.js
 * Log
 */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const debug = require('debug')('blog');

// debug.log = console.info.bind(console);

chai.should();

chai.use(chaiHttp);

const testerAccount = {
  firstName: 'tester',
  lastName: 'lol',
  username: 'tester1@test.com',
  password: 't3st3r1',
};

describe('Signup', () => {
  before(() => {
    app.models.User.destroy({
      where: {},
      truncate: true,
    })
      .then(() => {
        app.models.User.sync({ force: true });
      });
  });

  after(() => {
    // runs after all tests in this block
    app.models.User.destroy({
      where: {},
      truncate: true,
    })
      .then(() => {
        app.models.User.sync({ force: true });
      });
  });

  it('should add new user in database on POST /signup', (done) => {
    debug('Testing POST /signup. Invoking chai request')
    chai.request(app)
      .post('/signup')
      .type('form')
      .send(testerAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        // res.should.be.a('array');
        // TODO: check database and/or GET /users for the new account
        done();
      });
  });

  it('should log in with new user in database on /login POST', (done) => {
    chai.request(app)
      .post('/login')
      .type('form')
      .send(testerAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('array');
        done();
      });
  });
});
