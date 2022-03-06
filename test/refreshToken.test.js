import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

describe('Login testing ', () => {
  beforeEach(async () => {
    await Users.destroy({ where: { email: 'random@gmail.com' } });
  });

  afterEach(async () => {
    await Users.destroy({ where: { email: 'random@gmail.com' } });
  });

  const randomUser = {
    email: 'random@gmail.com',
    firstname: 'Random',
    lastname: 'Person',
    password: '$2a$12$qFP7wTRyEEclEjdoDA9OBOV3xDorty5aaE.nEy2lCRQwgVOdp1lIq',
    isVerified: true
  };
  const credentials = {
    email: 'random@gmail.com',
    password: 'pswd123'
  };

  it('When users provide valid refresh token get both access token and refresh token', async () => {
    await Users.create({ ...randomUser });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const res2 = await chai
      .request(app)
      .post('/api/user/refresh')
      .send({ refreshTokenKey: res.body.refreshToken });

    expect(res2).to.have.property('status', 200);
    expect(res2).to.have.property('body');
    expect(res2.body).to.have.property(
      'message',
      'Access token created successfully'
    );
    expect(res2.body).to.have.property('accessToken');
    expect(res2.body).to.have.property('refreshToken');
  });
  it('When user provide invalid refreshToken', async () => {
    await Users.create({ ...randomUser });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });
    const res2 = await chai
      .request(app)
      .post('/api/user/refresh')
      .send({ refreshTokenKey: `${res.body.refreshToken}1` });

    expect(res2).to.have.property('status', 400);
    expect(res2).to.have.property('body');
    expect(res2.body).to.have.property('Error', 'Invalid refresh token');
  });
});
