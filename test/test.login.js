const expect = require('chai').expect;
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
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    };
    chai.request(baseUrl)
        .post('/login')
        .send(
           userDetails
        )
        .end((error, response, body) => {
            expect(response.statusCode).to.equal(200);
            done();
         });
});
})