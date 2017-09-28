const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');

chai.should();

chai.use(chaiHttp);


describe('Posts', () => {
  it('should list ALL posts on /posts GET', (done) => {
    chai.request(server)
      .get('/posts')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  // TODO login
  it('should list a SINGLE post on /post/<id> GET', () => {
    chai.request(server)
      .post('/posts')
      .send({});
  });
  it('should add a SINGLE post on /posts POST');
  // it('should update a SINGLE post on /post/<id> PUT');
  it('should delete a SINGLE post on /post/<id> DELETE');
});
