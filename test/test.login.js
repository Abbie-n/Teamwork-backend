const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user sign up', () => {
  it('creats user', (done) => {
    const userDetails = {
      // LOG IN TEST!
      username: 'Testie4',
      firstname: 'Testie',
      lastname: 'Four',
      email: 'Testie4@test.com',
      password: 'Testie4equalstruthy',
    };
    chai.request(app)
      .post('/api/v1/auth/create-user')
      .send(
        userDetails,
      )
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});

describe('user log in', () => {
  it('logs in', (done) => {
    const userDetails = {
      // LOG IN TEST!
      email: 'Testie4@test.com',
      password: 'Testie4equalstruthy',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        userDetails,
      )
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});
