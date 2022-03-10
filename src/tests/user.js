import chai from 'chai';
import http from 'chai-http';
import app from '../app';

chai.use(http);
const { expect } = chai;
const user = {};
describe('User registration', () => {
  it('should return 201 and confirmation for valid input', (done) => {
    chai.request(app).post('api/user/register')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res).to.have.status(201);
        done();
      })
      .catch((err) => {
        throw (err);
      });
  });
  // test for invalid email
  it('should return invalid email message', (done) => {
    chai.request(app).post('api/user/register')
  });
  // test if email already exists
  it('Should return an error message email already exists', (done) => {
    chai.request(app).post('api/user/register')
  });
});
