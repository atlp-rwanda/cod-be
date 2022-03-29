import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

// Assertion
chai.should();

// Enable endpoints testing
chai.use(chaiHttp);

// Test if Root End Point is Working
describe('/GET root endpoint', () => {
  it('it should GET root endpoint', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
