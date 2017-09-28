/**
 * test-login.js
 * Log
 */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../bin/www');

chai.should();

chai.use(chaiHttp);

const testerAccount = {
  username: 'tester1@test.com',
  password: 't3st3r1',
};

describe('Signup', () => {
  it('should add new user in database on /signup POST', (done) => {
    chai.request(app)
      .post('/signup')
      .type('form')
      .send(testerAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('array');
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
