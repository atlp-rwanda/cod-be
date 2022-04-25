import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

describe('Login testing ', () => {
  const randomUser = {
    email: 'random20@gmail.com',
    firstname: 'Random',
    lastname: 'Person',
    password: '$2b$10$fRndnE12M7m5pZvV5PzIFe.WGYyerC3jOgPjqjMtdxqCUyfB4Lh/6',
    isVerified: true
  };
  const credentials = {
    email: 'random20@gmail.com',
    password: 'altp6@random'
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
