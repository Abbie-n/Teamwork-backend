const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');

const baseUrl = 'http://localhost:8000/api/v1/feed';
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view all posts', () => {
  it('returns all posts', (done) => {
    chai.request(baseUrl)
      .get('/')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM1NDAyNTgsImV4cCI6MTU3MzYyNjY1OH0.RnJeDiPgE8dskEkadRG4e9K9Bo1xhfR0YVLsD4hEzuQ')
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});
