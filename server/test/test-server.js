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
      const postLoginResponse = await agent.post('/login').type('form').send(defaultTesterAccount);
      // debug(postLoginResponse);
      const postPostResponse = await agent.post('/posts').type('form').send(testPost0);
      // console.log('postPostResponse is', postPostResponse);

      postPostResponse.should.have.status(200);
      // postPostResponse.should.have.property('body');
      postPostResponse.body.should.have.property('newPost');

      const newPost = postPostResponse.body.newPost;

      const correctString_id = testPost0.title.replace(/\s+/g, '-').toLowerCase();

      const correctPostObject = Object.assign({}, testPost0, { 'string_id': correctString_id }); // TODO: {style} convert all string_ids to stringIds
      // postPostResponse.body.should.be.json;
      // postPostResponse.body.should.be.a('array');

      const deleteRes = await agent.delete('/posts' + '/' + correctString_id);
    } catch (error) {
      console.error(error.stack);
      throw error;
    }
  });
  // it('should update a SINGLE post on /post/<id> PUT');
  it('should delete a SINGLE post on /post/<id> DELETE');
});
