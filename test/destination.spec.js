import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import { it } from 'mocha';
import { serve } from 'swagger-ui-express';
import server from '../src/app';

chai.should();
use(chaiHttp);

let loginToken, managerToken, adminToken;

before(async () => {
  const res = await request(server).post('/api/user/login').send({
    email: 'random1@gmail.com',
    password: 'altp6@random'
  });
  loginToken = res.body.accessToken;
  const res2 = await request(server).post('/api/user/login').send({
    email: 'manager1@cod.be',
    password: 'altp6@random'
  });
  managerToken = res2.body.accessToken;
  const res3 = await request(server).post('/api/user/login').send({
    email: 'superadmin@gmail.com',
    password: 'test@me123'
  });
  adminToken = res3.body.accessToken;
});

describe('Most travelled destination', () => {
  describe('/GET :accomodationId/destination-stats', () => {
    it('Should return most travelled destination for one accommodation', async () => {
      const res = await request(server)
        .get('/api/v1/accommodations/2/destinationStats')
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.eql('Destination statistics fetched successfully');
      expect(res.body.data).to.have.property('data').and.to.be.an('array');
    });
    it("Should return error if manager get stats for accommodation he/she doesn't manage", async () => {
      const res = await request(server)
        .get('/api/v1/accommodations/1/destinationStats')
        .set('Authorization', `Bearer ${managerToken}`);
      expect(res.status).to.equal(401);
      expect(res.body)
        .to.have.property('Error')
        .and.to.eql('Manager not assigned to this accommodation');
    });
    it('Should allow only managers and requester to get stats', async () => {
      const res = await request(server)
        .get('/api/v1/accommodations/1/destinationStats')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).to.equal(401);
      expect(res.body)
        .to.have.property('Error')
        .and.to.eql('Only managers and requesters can view destination stats');
    });
    it("Should return error if the accommodation doesn't exist", async () => {
      const res = await request(server)
        .get('/api/v1/accommodations/100/destinationStats')
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res.status).to.equal(404);
      expect(res.body)
        .to.have.property('Error')
        .and.to.eql('Accommodation not found');
    });
  });
  let requesterStatsLength;
  describe('/GET /accommodations/destinationStats', () => {
    it('Should return most travelled destination for all accommodations', async () => {
      const res = await request(server)
        .get('/api/v1/accommodations/destinationStats')
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      requesterStatsLength = res.body.data.data.length;
      expect(res.body.data)
        .to.have.property('message')
        .and.to.eql('Destination statistics fetched successfully');
      expect(res.body.data).to.have.property('data').and.to.be.an('array');
    });
    it('Should allow manager to view stats of only the accommodation he/she manages', async () => {
      const res = await request(server)
        .get('/api/v1/accommodations/destinationStats')
        .set('Authorization', `Bearer ${managerToken}`);
      expect(res.body.data)
        .to.have.property('message')
        .and.to.eql('Destination statistics fetched successfully');
      expect(res.body.data).to.have.property('data').and.to.be.an('array');
      expect(res.body.data.data)
        .to.be.an('array')
        .length.lt(requesterStatsLength);
    });
  });
});
