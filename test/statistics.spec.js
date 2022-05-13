import { describe, it } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import app from '../src/app';

const day = new Date();
const yesterday = new Date(day.setDate(day.getDate() - 1));
const today = new Date(day.setDate(day.getDate() + 1));
const start = yesterday.toLocaleString();
const end = today.toLocaleString();

chai.use(chaiHTTP);
describe('Statistics test ', () => {
  it('The user logged in can get the number of trips made in range of time', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics?start=${start}&end=${end}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data.data).to.have.property('trips', 2);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got all trips you have made between ${start} and ${end} succesfully`
    );
  });
  it('The Manager logged in can get the number of trips managed', async () => {
    const credentials = { email: 'manager1@cod.be', password: 'altp6@random' };

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics?start=${start}&end=${end}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2.body).to.have.property('status', 200);
    expect(res2.body.data.data).to.have.property('trips');
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got all trips you have made between ${start} and ${end} succesfully`
    );
  });
  it('User not logged in as Requester or Manager  can not get statistics', async () => {
    const credentials = { email: 'mcy@cod.com', password: 'Kigali' };
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics?start=${start}&end=${end}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 401);
    expect(res2.body).to.have.property(
      'Error',
      `Statistics of travel are available for requester and Manager`
    );
  });
  it('User can get the statistics of recent days', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const period = 'day';
    const number = 10;
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data.data).to.have.property('trips', 2);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('User can get the statistics of recent weeks', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const period = 'week';
    const number = 1;
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data.data).to.have.property('trips', 2);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('User can get the statistics of recent months', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const period = 'month';
    const number = 1;
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data.data).to.have.property('trips', 2);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('User can get the statistics of recent years', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const period = 'year';
    const number = 1;
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data.data).to.have.property('trips', 2);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('If User try period which does not exist user get message', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const period = 'invalid';
    const number = 10;
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 400);
    expect(res2.body).to.have.property('Error', `Put valid period`);
  });
  it('User not logged in as Requester or Manager  can not get statistics', async () => {
    const credentials = { email: 'mcy@cod.com', password: 'Kigali' };
    const period = 'days';
    const number = 10;
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 401);
    expect(res2.body).to.have.property(
      'Error',
      `Statistics of travel are available for requester and Manager`
    );
  });
  it('The user should put valid range of time', async () => {
    const credentials = { email: 'demouser2@cod.be', password: 'altp6@random' };
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/trip/statistics?start=${end}&end=${start}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 400);
    expect(res2.body.data).to.have.property(
      'message',
      `The ending date must be greater than starting date`
    );
  });
});
