import dotenv from 'dotenv';
import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

dotenv.config();

const { Users } = models;
chai.should();
use(chaiHttp);

const user = {
  firstname: 'Test',
  lastname: 'Demo User',
  email: 'demotest@cod.com',
  password: 'test1234@5678'
};

let emailToken;

describe('POST /api/user/register  User Registration Endpoint', () => {
  it('It Should Register A New User', async () => {
    const res = await request(server).post('/api/user/register').send(user);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('Message');
    expect(res.body).to.have.property('emailToken');
    emailToken = res.body.emailToken;
  });

  it('It Should Verify A Newly Registered User Via Email', async () => {
    const res = await request(server).get(
      `/api/verify-user?token=${emailToken}`
    );
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('Verified').and.to.be.eql(true);
  });
});
