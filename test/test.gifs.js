const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view a specific gif', () => {
  it('returns a specific gif', (done) => {
    chai.request(app)
      .get('/api/v1/gifs/22')
      .set('authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
  });
});


describe('user deletes gif', () => {
  it('deletes gif', (done) => {
    chai.request(app)
      .delete('/api/v1/gifs/14')
      .set('authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        expect(response.statusCode).to.equal(400);
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
      gifid: '22',
    };
    chai.request(app)
      .post('/api/v1/gifs/22/comment')
      .send(
        details,
      )
      .set('authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
  });
});
