import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

chai.should();
use(chaiHttp);

const { Trips } = models;
let adminLoginToken,
  managerLoginToken,
  newManagerLoginToken,
  randomUserToken,
  tripId;

const testData = {
  travelAdmin: {
    email: 'mcy@cod.com',
    password: 'Kigali'
  },
  accomManager: {
    email: 'manager2@cod.be',
    password: 'altp6@random'
  },
  approvedReq: {
    status: 'approved'
  },
  rejectedReq: {
    status: 'rejected'
  },
  pendingReq: {
    status: 'pending'
  },
  badReqBody: {
    status: 'string'
  },
  managerRoleReq: {
    accomodationId: 3,
    managerId: 'd53e3469-661e-40c0-a2bb-d66e0e5fa19d'
  },
  notAssignedManager: {
    email: 'manager3@cod.be',
    password: 'altp6@random'
  },
  randomUser: {
    email: 'kevin@cod.com',
    password: 'Kigali'
  },
  wrongTripId: {
    tripId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c831'
  }
};

describe('Approve Or Reject A Trip Request', () => {
  before(async () => {
    /**
     * Will Assign Manager To Accomodation Before Testing
     */
    const res1 = await chai
      .request(server)
      .post('/api/user/login')
      .send(testData.travelAdmin);
    adminLoginToken = res1.body.accessToken;
    await chai
      .request(server)
      .patch('/api/v1/users/assignManagerRole')
      .set('Authorization', `Bearer ${adminLoginToken}`)
      .send(testData.managerRoleReq);
    const res2 = await chai
      .request(server)
      .post('/api/user/login')
      .send(testData.accomManager);
    managerLoginToken = res2.body.accessToken;
    const res3 = await chai
      .request(server)
      .get('/api/v1/trip')
      .set('Authorization', `Bearer ${managerLoginToken}`);
    tripId = res3.body.data.data[0].id;
  });
  it('Should Approve A Trip Request', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.approvedReq);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw A Confict Error If Trip Request Is Approved Already', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.approvedReq);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('data');
  });
  it('Should Reject A Trip Request', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.rejectedReq);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw A Confict Error If Trip Request Is Rejected Already', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.rejectedReq);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('data');
  });
  it('Should Make A Trip Request Request Pending If It Was Rejected Already', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.pendingReq);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
  });
  it('Should Make A Trip Request Request Pending If It Was Approved Already', async () => {
    await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.approvedReq);
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.pendingReq);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw A Confict Error If Trip Request Is Pending Already', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.pendingReq);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw A Bad Request Error If The Request Body Is Not Valid', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.badReqBody);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw An Error If The Trip Does Not Exist', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${testData.wrongTripId.tripId}`)
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.approvedReq);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw An Error If Mannager Is Not Assigned To The Accomodation', async () => {
    const badReq = await chai
      .request(server)
      .post('/api/user/login')
      .send(testData.notAssignedManager);
    newManagerLoginToken = badReq.body.accessToken;
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${newManagerLoginToken}`)
      .send(testData.approvedReq);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('data');
  });
  it('Should Throw An Error If the Logged In User Is not a Mannager', async () => {
    const badReq = await chai
      .request(server)
      .post('/api/user/login')
      .send(testData.randomUser);
    randomUserToken = badReq.body.accessToken;
    const res = await chai
      .request(server)
      .patch(`/api/v1/trip/approve_reject/${tripId}`)
      .set('Authorization', `Bearer ${randomUserToken}`)
      .send(testData.approvedReq);
    expect(res).to.have.status(403);
    expect(res.body)
      .to.have.property('Error')
      .and.to.be.eql('Access Denied, Not a Manager');
  });
});
