const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app');

const defaultTesterAccount = {
  firstName: 'default',
  lastName: 'tester',
  username: 'default.tester@test.com',
  password: 't3st3r',
};

const testPost0 = {
  title: 'This is the beginning',
  body: 'Haha but a beginning is good because you gotta start somewhere. ',
};

const postUserFormToPromise = (url, testerAccount) =>
  chai.request(app)
    .post(url)
    .type('form')
    .send(testerAccount)
    .catch((error) => { throw error; });

module.exports = { postUserFormToPromise, defaultTesterAccount, testPost0 };
