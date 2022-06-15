import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';
import * as userService from '../src/services/userService';

const { Users } = models;
chai.should();

use(chaiHttp);
let loginToken;
const loginAdmin = {
  email: 'superadmin@gmail.com',
  password: 'test@me123'
};
const user = {
  firstname: 'Faustin',
  lastname: 'IYAREMYE',
  email: 'testemail1@me.com',
  password: 'test1234@5678'
};
const invalidEmail = {
  firstname: 'Faustin',
  lastname: 'IYAREMYE',
  email: 'testemail',
  password: 'test1234@5678'
};
const invalidPassword = {
  firstname: 'Faustin',
  lastname: 'IYAREMYE',
  email: 'testemail1@me.com',
  password: 'test123'
};
describe('/POST  register endpoint', () => {
  it('It should register a new user', async () => {
    const res = await request(server).post('/api/user/register').send(user);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('Message');
  });
  it('It should return email already exists', async () => {
    const res = await request(server).post('/api/user/register').send(user);
    expect(res).to.have.status(409);
  });
  it('It should return the password does not include in the response', async () => {
    const userInstance = await userService.findByEmail(user.email);
    expect(userInstance.password).to.equal(undefined);
  });
  it('It should return invalid email', async () => {
    const res = await request(server)
      .post('/api/user/register')
      .send(invalidEmail);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('Error');
  });
  it('It should return invalid password', async () => {
    const res = await request(server)
      .post('/api/user/register')
      .send(invalidPassword);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('Error');
  });
  it('It should login a super Admin User', async () => {
    const res = await request(server).post('/api/user/login').send(loginAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
    loginToken = res.body.accessToken;
  });
  it('It should get all users', async () => {
    const res = await request(server)
      .get('/api/users')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(loginAdmin);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('users');
  });
});
