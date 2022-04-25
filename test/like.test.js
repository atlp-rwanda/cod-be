import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

describe('Like testing ', () => {
  beforeEach(async () => {
    await Users.destroy({ where: { email: 'random15@gmail.com' } });
  });

  afterEach(async () => {
    await Users.destroy({ where: { email: 'random15@gmail.com' } });
  });

  const randomUser = {
    email: 'random15@gmail.com',
    firstname: 'Random',
    lastname: 'Person',
    password: '$2a$12$qFP7wTRyEEclEjdoDA9OBOV3xDorty5aaE.nEy2lCRQwgVOdp1lIq',
    isVerified: true,
    roleId: 4
  };
  const credentials = {
    email: 'random15@gmail.com',
    password: 'pswd123'
  };
  const accomodationId = 2;
  let token = 0;
  it('If the accomodation  does not exist user can not like it', async () => {
    await Users.create({ ...randomUser });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accomodation/767598/like`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 404);
    expect(res2).to.have.property('body');
    expect(res2.body).to.have.property(
      'Error',
      'This accomodation does not exist'
    );
  });
  it('When user use invalid accomodation got message of invalid accomodation id', async () => {
    const res = await chai.request(app).post(`/api/v1/accomodation/-20/like`);
    expect(res.body).to.have.property('status', 400);
    expect(res.body.data).to.have.property(
      'message',
      'Accomodation id should be valid. must be greater than or equal to 1'
    );
  });
  it('If accomodation exist and user logged in as requester can like it', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/like`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 201);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `You have liked accomodation`
    );
  });
  it('User can unlike the accomodation that previously liked', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accomodation/2/like`)
      .set({ Authorization: `Bearer ${token}` });
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/like`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `You have unliked an accomodation`
    );
  });
  it('User can get all likes of an accomodation', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/like`)
      .set({ Authorization: `Bearer ${token}` });
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/like`);
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got likes of accomodation`
    );
  });
  it('User can not get likes of accomodation which does not exist', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/accomodation/763434242/like`);
    expect(res).to.have.property('status', 404);
    expect(res.body).to.have.property(
      'Error',
      `This accomodation does not exist`
    );
  });
  it('If no likes User can get that there is no likes', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/like`)
      .set({ Authorization: `Bearer ${token}` });

    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      'No likes for this accomodation'
    );
  });
  // dislikes
  it('User can dislike an accomodation ', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 201);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `You have disliked an accomodation`
    );
  });
  it('User can not dislike an accomodation which do not exist ', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accomodation/762342428/dislike`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 404);
    expect(res2.body).to.have.property(
      'Error',
      `This accomodation does not exist`
    );
  });
  it('User can remove his dislike', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set({ Authorization: `Bearer ${token}` });
    const res2 = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body.data).to.have.property(
      'message',
      `You have undisliked an accomodation`
    );
  });
  it('user can get all dislikes of an accomodation', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    token = res.body.accessToken;
    await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set({ Authorization: `Bearer ${token}` });
    const res2 = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res2).to.have.property('status', 200);
    expect(res2.body.data).to.have.property(
      'message',
      `You succesfully got dislikes of accomodation`
    );
  });
  it('User can not get dislikes of accomodation which does not exist', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/accomodation/763434242/dislike`);
    expect(res).to.have.property('status', 404);
    expect(res.body).to.have.property(
      'Error',
      `This accomodation does not exist`
    );
  });
  it('If no dislikes User can get that there is no dislikes', async () => {
    await Users.create({ ...randomUser });

    const res = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/dislike`);

    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      'No dislikes for this accomodation'
    );
  });
});
