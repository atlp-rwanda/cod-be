import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users, Trips } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);
let today = new Date();

describe('Rating test ', () => {
  beforeEach(async () => {
    await Users.destroy({ where: { email: 'random14@gmail.com' } });
  });

  afterEach(async () => {
    await Users.destroy({ where: { email: 'random14@gmail.com' } });
  });
  const trip = {
    departure: 'Huye',
    destination: ['Kigali'],
    dateOfTravel: today.setDate(new Date().getDate() + 1),
    dateOfReturn: today.setDate(new Date().getDate() + 2),
    accomodationId: 2,
    travelReason: 'This is travel reason in test'
  };
  const randomUser = {
    email: 'random14@gmail.com',
    firstname: 'Random',
    lastname: 'Person',
    password: '$2a$12$qFP7wTRyEEclEjdoDA9OBOV3xDorty5aaE.nEy2lCRQwgVOdp1lIq',
    isVerified: true
  };
  const credentials = {
    email: 'random14@gmail.com',
    password: 'pswd123'
  };
  let token = 0;
  const accomodationId = 2;
  it('When the accomodation does not exist you can not rate it', async () => {
    await Users.create({ ...randomUser });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accommodations/767598/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    expect(res2).to.have.property('status', 404);
    expect(res2).to.have.property('body');
    expect(res2.body).to.have.property(
      'Error',
      'That accomodation does not exist'
    );
  });
  it('Logged in user can rate accomodation if he has been there', async () => {
    const user = await Users.create({ ...randomUser });

    await Trips.create({
      ...trip,
      userId: user.id,
      accomodationId: accomodationId,
      status: 'approved'
    });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accommodations/${accomodationId}/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    expect(res2).to.have.property('status', 201);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `You have rated accomodation with id ${accomodationId} with 5 stars`
    );
  });
  it('User can not rate accomodation if he has not been there', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accommodations/${accomodationId}/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    expect(res2).to.have.property('status', 401);
    expect(res2.body).to.have.property(
      'Error',
      'You had not been to this accomodation. You can not rate it'
    );
  });
  it('Logged in user can update his ratings on accomodation', async () => {
    const user = await Users.create({ ...randomUser });

    await Trips.create({
      ...trip,
      userId: user.id,
      accomodationId: accomodationId,
      status: 'approved'
    });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accommodations/${accomodationId}/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accommodations/${accomodationId}/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `You have updated ratings of accomodation with id ${accomodationId} to 5 stars`
    );
  });
  it('User can get average of all ratings of an accomodation', async () => {
    const user = await Users.create({ ...randomUser });

    await Trips.create({
      ...trip,
      userId: user.id,
      accomodationId: accomodationId,
      status: 'approved'
    });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accommodations/${accomodationId}/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accommodations/${accomodationId}/rating`);
    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `Ratings of accomodation ${accomodationId}`
    );
  });
  it('If no ratings User can get that there is no average of ratings', async () => {
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accommodations/${accomodationId}/rating`);
    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      'No ratings for this accomodation'
    );
  });
  it('User can not get ratings of accomodation which do not exist', async () => {
    await Users.create({ ...randomUser });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accommodations/767598/rating`);
    expect(res2).to.have.property('status', 404);
    expect(res2).to.have.property('body');
    expect(res2.body).to.have.property(
      'Error',
      'That accomodation does not exist'
    );
  });
  it('user can get classification of ratings of an accomodation', async () => {
    const user = await Users.create({ ...randomUser });

    await Trips.create({
      ...trip,
      userId: user.id,
      accomodationId: accomodationId,
      status: 'approved'
    });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accommodations/${accomodationId}/rating`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ serviceRating: 5 });
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accommodations/${accomodationId}/getratings`);
    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `Ratings of accomodation ${accomodationId}`
    );
  });
  it('If no ratings User can get that there is classification of ratings ', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/accommodations/${accomodationId}/getratings`);
    expect(res).to.have.property('status', 200);
    expect(res).to.have.property('body');
    expect(res.body.data).to.have.property(
      'message',
      'No ratings for this accomodation'
    );
  });
  it('User can not get classification of unexisting accomodation', async () => {
    await Users.create({ ...randomUser });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accommodations/767598/getratings`);
    expect(res2).to.have.property('status', 404);
    expect(res2).to.have.property('body');
    expect(res2.body).to.have.property(
      'Error',
      'That accomodation does not exist'
    );
  });
});
