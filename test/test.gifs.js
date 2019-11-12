const { expect } = require('chai');
const chai = require('chai');
const chaihttp = require('chai-http');

const baseUrl = 'http://localhost:8000/api/v1/gifs';
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view a specific gif', () => {
  it('returns a specific gif', (done) => {
    chai.request(baseUrl)
      .get('/22')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM1NDAyNTgsImV4cCI6MTU3MzYyNjY1OH0.RnJeDiPgE8dskEkadRG4e9K9Bo1xhfR0YVLsD4hEzuQ')
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});


describe('user deletes gif', () => {
  it('deletes gif', (done) => {
    chai.request(baseUrl)
      .delete('/14')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM1NDAyNTgsImV4cCI6MTU3MzYyNjY1OH0.RnJeDiPgE8dskEkadRG4e9K9Bo1xhfR0YVLsD4hEzuQ')
      .end((error, response) => {
        expect(response.statusCode).to.equal(200);
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
    chai.request(baseUrl)
      .post('/22/comment')
      .send(
        details,
      )
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM1NDAyNTgsImV4cCI6MTU3MzYyNjY1OH0.RnJeDiPgE8dskEkadRG4e9K9Bo1xhfR0YVLsD4hEzuQ')
      .end((error, response) => {
        expect(response.statusCode).to.equal(201);
        done();
      });
  });
});
