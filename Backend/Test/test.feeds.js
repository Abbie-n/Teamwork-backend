const expect = require('chai').expect;
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
        .set('authorization', process.env.TEST_TOKEN)
        .end((error, response, body) => {
            console.log(error);
            expect(response.statusCode).to.equal(200);
            done();
         });
});
})