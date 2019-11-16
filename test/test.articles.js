const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view a specific article', () => {
  it('returns a specfic article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/6')
      .set('authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
  });
});

describe('user creates new comment', () => {
  it('creates new comment', (done) => {
    const details = {
      // DETAILS TO COMMENT
      comment: 'Test comment',
      authorid: 'Testie3',
      articleid: '6',
    };
    chai.request(app)
      .post('/api/v1/articles/6/comment')
      .send(
        details,
      )
      .set('authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        expect(response.statusCode).to.equal(201);
        done();
      });
  });
});
