import chai from 'chai';
import http from 'chai-http';
import app from '../app';

chai.use(http);
const { expect } = chai;
const user = {
  firstname:'Faustin',
  lastname:'IYAREMYE',
  email:'test@me.com',
  password:'test@me.com123',
};
describe('User registration', () => {
  it('should return 201 and json result object with token', (done) => {
    chai.request(app).post('api/user/register')
      .set('Content-Type', 'application/json')
      .send(user)
      .then((res) => {
        expect(res).to.have.status(201);
        done();
      })
      .catch((err) => {
        throw (err);
      });
  });
  // test if email already exists
  it('Should return an error message email already exists', (done) => {
    chai.request(app).post('api/user/register')
    .set('Content-Type', 'application/json')
    .send(user)
    .end((err,res)=>{
      expect(res).to.have.status(500);
      expect(res.body.message).to.be.equal('Email already exists');
      done();});
  });
});
