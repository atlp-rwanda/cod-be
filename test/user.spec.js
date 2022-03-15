import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app.js";   
import models from '../src/database/models';

const { Users } = models;
chai.should();

chai.use(chaiHttp);
const user={
    firstname:'Faustin',
    'lastname':'IYAREMYE',
    email:'testdfgdfgdfg@me.com',
    password:'test1234@5678'}
describe('/POST  endpoint', () => {
  before(async()=>{
    await Users.destroy({where: { email: `${user.email}` }});
  });
  it('it should register a new user', (done) => {
    chai.request(server)
        .post('/api/user/register')
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
              res.should.have.status(201);
          done();
        });
  });
})
describe('/POST  endpoint', () => {
    it('it should return email already exists', (done) => {
      chai.request(server)
          .post('/api/user/register')
          .set('content-type', 'application/json')
          .send(user)
          .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property('email');
            done();
          });
    });
  })
