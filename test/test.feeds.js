const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view all posts', () => {
  it('returns all posts', (done) => {
    chai.request(app)
      .get('/api/v1/feed')
      .set('authorization', process.env.TEST_TOKEN)
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});
