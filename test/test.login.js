const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');

const baseUrl = 'http://localhost:8000/api/v1/auth';
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
    chai.request(baseUrl)
      .post('/login')
      .send(
        userDetails,
      )
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});
