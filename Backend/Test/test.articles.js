const expect = require('chai').expect;
const chai = require('chai');
const chaihttp = require('chai-http');
const baseUrl = 'http://localhost:8000/api/v1/articles';
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view a specific article', () => {
    it('returns a specfic article', (done) => {
    chai.request(baseUrl)
        .get(process.env.ARTICLEGETROUTE)
        .set('authorization', process.env.TEST_TOKEN)
        .end((error, response, body) => {
            console.log(error);
            expect(response.statusCode).to.equal(200);
            done();
         });
});
})

describe('user creates new comment', () => {
    it('creates new comment', (done) => {
    const details = {
        // DETAILS TO COMMENT
        'comment': 'Test comment',
        'authorid': process.env.AUTHORID,
        'articleid': process.env.ARTICLEID
    };
    chai.request(baseUrl)
        .post(process.env.ARTICLECOMMENTPOSTROUTE)
        .send(
           details
        )
        .set('authorization', process.env.TEST_TOKEN)
        .end((error, response, body) => {
            expect(response.statusCode).to.equal(201);
            done();
         });
});
})


