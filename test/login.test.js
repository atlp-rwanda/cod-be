import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

describe('Login testing ', () => {
  beforeEach(async () => {
    await Users.destroy({ where: { email: 'random12@gmail.com' } });
  });

  afterEach(async () => {
    await Users.destroy({ where: { email: 'random12@gmail.com' } });
  });

  const randomUser = {
    email: 'random12@gmail.com',
    firstname: 'Random',
    lastname: 'Person',
    password: '$2a$12$qFP7wTRyEEclEjdoDA9OBOV3xDorty5aaE.nEy2lCRQwgVOdp1lIq',
    isVerified: true
  };
  const credentials = {
    email: 'random12@gmail.com',
    password: 'pswd123'
  };
  it('When user inter no credentials not log in', async () => {
    await Users.create({ ...randomUser });
    const res = await chai.request(app).post('/api/user/login');

    expect(res).to.have.property('status', 400);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('Error', 'Invalid input');
  });
  it('When users has not verified should not log in', async () => {
    await Users.create({ ...randomUser, isVerified: false });
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials });

    expect(res).to.have.property('status', 400);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property(
      'Error',
      'Verify to log into your account'
    );
  });
  it('When user provide invalid email', async () => {
    await Users.create(randomUser);
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials, email: 'invalid@gmail.com' });
    expect(res).to.have.property('status', 400);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('Error', 'This email does not exist');
  });

  it('When users provide invalid password should fail', async () => {
    await Users.create(randomUser);
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send({ ...credentials, password: '123random123' });

    expect(res).to.have.property('status', 400);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('Error', 'Invalid Password');
  });

  it('when both email and password are valid it should login', async () => {
    await Users.create(randomUser);

    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send(credentials);
    expect(res).to.have.property('status', 200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('message', 'User logged in successfully');
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
  });
});
