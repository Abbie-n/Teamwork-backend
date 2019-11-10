const expect = require('chai').expect;
const chai = require('chai');
const chaihttp = require('chai-http');
const baseUrl = 'http://localhost:5000/api/v1/auth';

chai.use(chaihttp);
chai.should();
describe('user log in', () => {
    it('logs in', (done) => {
    const userDetails = {
        // LOG IN TEST!
        email: "Testie3@test.com",
        password: "Testieequalstruthy"
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