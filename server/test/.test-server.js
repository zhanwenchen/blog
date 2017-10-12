process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const debug = require('debug')('blog');

chai.should();

chai.use(chaiHttp);

const { postUserFormToPromise, defaultTesterAccount } = require('./utils');

describe('Posts', () => {

  before((done) => {
    chai.request(app)
      .post('/signup')
      .type('form')
      .send(testerAccount)
      .then(done, done)
  });

  it('should list ALL posts on /posts GET', (done) => {
    chai.request(app)
      .get('/posts')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
      })
      .then(done, done)
  });

  // TODO login
  it('should list a SINGLE post on /post/<id> GET', () => {
    chai.request(app)
      .get('/posts')
  });
  it('should add a SINGLE post on /posts POST after login', (done) => {
    postUserFormToPromise('login', defaultTesterAccount)
      .then(() => {
        chai.request(app)
          .post('/posts')
          .send({

          })
      })


  });
  // it('should update a SINGLE post on /post/<id> PUT');
  it('should delete a SINGLE post on /post/<id> DELETE');
});
