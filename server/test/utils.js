const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');


const testerAccount = {
  firstName: 'tester',
  lastName: 'lol',
  username: 'tester1@test.com',
  password: 't3st3r1',
};

const postUserFormToPromise = url =>
  chai.request(app)
    .post(url)
    .type('form')
    .send(testerAccount)
    .catch((error) => { throw error; });

module.exports = { postUserFormToPromise };
