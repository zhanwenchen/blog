/*eslint-disable*/
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const debug = require('debug')('blog');

chai.should();

chai.use(chaiHttp);

const { postUserFormToPromise, defaultTesterAccount, testPost0 } = require('./utils');

describe('Posts', () => {

  before(async () => {
    return await chai.request(app)
      .post('/signup')
      .type('form')
      .send(defaultTesterAccount);
  });

  it('should list ALL posts on /posts GET', async () => {
    try {
      const res = await chai.request(app).get('/posts');
      // debug(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
    } catch (error) {
      throw error;
    }
  });

  it('should list a SINGLE post on /post/<id> GET', () => {
    chai.request(app)
      .get('/posts')
  });

  it('should add a SINGLE post on /posts POST after login', async () => {
    try {
      const agent = chai.request.agent(app);
      const loginResponse = await agent.post('/login').type('form').send(defaultTesterAccount);
      // debug(loginResponse);
      const postPostResponse = await agent.post('/posts').type('form').send(testPost0);
      // debug(postPostResponse);

      // const res = await postUserFormTosPromise('login', defaultTesterAccount);
      // const res = chai.request(app).post('/posts').send(testPost0);
      postPostResponse.should.have.status(200);
      postPostResponse.body.should.be.json;
      postPostResponse.body.should.be.a('array');
    } catch (error) {
      throw error;
    }
  });
  // it('should update a SINGLE post on /post/<id> PUT');
  it('should delete a SINGLE post on /post/<id> DELETE');
});
