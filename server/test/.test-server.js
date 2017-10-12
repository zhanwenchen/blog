const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const debug = require('debug')('blog');

chai.should();

chai.use(chaiHttp);

const testerAccount = {
  firstName: 'tester',
  lastName: 'lol',
  username: 'tester2@test.com',
  password: 't3st3r2',
};

describe('Posts', () => {

  before(function(done) {
    chai.request(app)
      .post('/signup')
      .type('form')
      .send(testerAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        app.models.User.findOne({ where: { username: testerAccount.username } })
          .then(user => {
            user.should.be.a('object');
            user.username.should.equal(testerAccount.username);
            user.firstName.should.equal(testerAccount.firstName);
            user.lastName.should.equal(testerAccount.lastName);
          })
          .then(done, done)
      });
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
      .post('/posts')
      .send({});
  });
  it('should add a SINGLE post on /posts POST', function(done) {

  });
  // it('should update a SINGLE post on /post/<id> PUT');
  it('should delete a SINGLE post on /post/<id> DELETE');
});
