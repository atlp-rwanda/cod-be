import { describe, it } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import app from '../src/app';

chai.use(chaiHTTP);

describe('Logout testing ', () => {
  const credentials = {
    email: 'random@gmail.com',
    password: 'altp6@random'
  };
  let token;
  it('should login first', async () => {
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send(credentials);
    token = res.body.accessToken;
    expect(res).to.have.property('status', 200);
    expect(res).to.have.property('body');
    expect(res.body).to.have.property('message', 'User logged in successfully');
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
  });
  it('should not logout without access token', async () => {
    const res = await chai.request(app).delete('/api/user/logout');
    expect(res.body).to.have.property('status', 401);
    expect(res.body).to.have.property('Error', 'Please Log in');
  });
  it('should not logout with invalid access token', async () => {
    const res = await chai
      .request(app)
      .delete('/api/user/logout')
      .set({ Authorization: `Bearer ${token}12` });
    expect(res.body).to.have.property('status', 406);
    expect(res.body).to.have.property('Error', 'Invalid accessToken');
  });
  it('should logout if already logged in', async () => {
    const res = await chai
      .request(app)
      .delete('/api/user/logout')
      .set({ Authorization: `Bearer ${token}` });
    expect(res).to.have.property('status', 204);
  });
  it('should not logout when logged out', async () => {
    const res = await chai
      .request(app)
      .delete('/api/user/logout')
      .set({ Authorization: `Bearer ${token}` });
    expect(res.body).to.have.property('status', 401);
    expect(res.body).to.have.property(
      'Error',
      'You are logged out! Please Log in'
    );
  });
});
