import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import models from '../src/database/models';
import app from '../src/app.js';

const { Accomodation } = models;
chai.should();

use(chaiHttp);

let loginToken, accomId;
const users = {
  loginTravelAdmin: {
    email: 'mcy@cod.com',
    password: 'Kigali'
  },
  manager: {
    email: 'manager1@cod.be',
    password: 'altp6@random'
  }
};

describe('/PATCH  Assign Manager Role', () => {
  before(async () => {
    const accoms = await Accomodation.findAll({});
    accomId = accoms[0].dataValues.id;
  });
  it('It Should Login As A Travel Adminstrator', async () => {
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send(users.loginTravelAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
    loginToken = res.body.accessToken;
  });

  it('It Should Assign Manager Role to Available managers In a provided accomodation', async () => {
    const reqBody = {
      accomodationId: accomId,
      managerId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c841'
    };
    const res = await chai
      .request(app)
      .patch('/api/v1/users/assignManagerRole')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(reqBody);
    expect(res).to.have.status(200);
  });

  it('It Should Throw An Error When ManagerId Id Or Accomodation Id Does Not Exist', async () => {
    const reqBody = {
      accomodationId: 1020,
      managerId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c845'
    };
    const res = await chai
      .request(app)
      .patch('/api/v1/users/assignManagerRole')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(reqBody);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
  });

  it('It Should Fetch All Managers', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/users/managers')
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
  });
  it('It Should Not Fetch Managers If User Is Not An Admin User', async () => {
    const badReq = await chai
      .request(app)
      .post('/api/user/login')
      .send(users.manager);
    loginToken = badReq.body.accessToken;
    const res = await chai
      .request(app)
      .get('/api/v1/users/managers')
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('status');
  });
  it('It Should Not Fetch Managers If User Is Not Logged In', async () => {
    const res = await chai.request(app).get('/api/v1/users/managers');
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('status');
  });
});
