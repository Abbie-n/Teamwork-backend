const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user log in', () => {
  it('logs in', (done) => {
    const userDetails = {
      // LOG IN TEST!
      email: 'Testie3@test.com',
      password: 'Testieequalstruthy',
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
