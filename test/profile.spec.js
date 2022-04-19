import { describe, it } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users, Profile } from '../src/database/models';
import app from '../src/app';
import { decodeAccessToken } from '../src/utils/helpers/generateToken';

chai.use(chaiHTTP);

let token, id;

describe('/PUT User Profile ', () => {
  after(async () => {
    await Users.destroy({ where: { email: 'random@gmail.com' } });
    await Profile.destroy({ where: { userId: id } });
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
  const profileInfo = {
    gender: 'Female',
    language: 'Kinyarwanda',
    currency: 'rwf',
    location: 'Kigali',
    departement: 'ICT',
    manager: 'none',
    birthdate: '2002-02-02'
  };

  it('Should Update Profile After Logged in', async () => {
    await Users.create(randomUser);

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send(credentials);
    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('accessToken');

    token = res.body.accessToken;
    const decoded = await decodeAccessToken(token);
    id = decoded.id;

    await Profile.create({ userId: id });

    const profileRes = await chai
      .request(app)
      .put('/api/v1/user/profile/' + id)
      .set({
        Authorization: `Bearer ${token}`
      })
      .send(profileInfo);

    expect(profileRes).to.have.status(200);
    expect(profileRes.body.data).to.have.property('Message');
  });
});
