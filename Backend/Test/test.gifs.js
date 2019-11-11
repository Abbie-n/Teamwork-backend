const expect = require('chai').expect;
const chai = require('chai');
const chaihttp = require('chai-http');
const baseUrl = 'http://localhost:5000/api/v1/gifs';
require('dotenv').config();

chai.use(chaihttp);
chai.should();

describe('user can view a specific gif', () => {
    it('returns a specific gif', (done) => {
    chai.request(baseUrl)
        .get(process.env.GIFGETROUTE)
        .set('authorization', process.env.TEST_TOKEN)
        .end((error, response, body) => {
            console.log(error);
            expect(response.statusCode).to.equal(200);
            done();
         });
});
})


describe('user deletes gif', () => {
    it('deletes gif', (done) => {
    chai.request(baseUrl)
        .delete(process.env.GIFDELETEROUTE)
        .set('authorization', process.env.TEST_TOKEN)
        .end((error, response, body) => {
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
        'gifid': process.env.GIFID
    };
    chai.request(baseUrl)
        .post(process.env.GIFCOMMENTPOSTROUTE)
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