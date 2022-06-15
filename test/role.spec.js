import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import models from '../src/database/models';
import * as userService from '../src/services/userService';
import bcrypt from 'bcrypt';

const { Users, Roles } = models;
chai.should();

use(chaiHttp);

let loginToken;
const loginAdmin = {
  email: 'superadmin@gmail.com',
  password: 'test@me123'
};

describe('/PATCH  assign role', () => {
  it('It should login a super Admin User', async () => {
    const res = await request(app).post('/api/user/login').send(loginAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
    loginToken = res.body.accessToken;
  });

  it('It should change the user role', async () => {
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash('test@me123', salt);
    const userData = {
      firstname: 'Faustin',
      lastname: 'IYAREMYE',
      email: 'testemail@me.com',
      password: userPassword
    };

    const userAdded = await userService.addUser(userData);
    const updateRole = { rolename: 'Travel Administrator', user: userAdded.id };

    const res = await request(app)
      .patch('/api/v1/users/assignRole')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(updateRole);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
});
