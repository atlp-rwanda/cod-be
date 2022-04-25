import dotenv from 'dotenv';
import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

dotenv.config();

const { Users } = models;
chai.should();
use(chaiHttp);

const userEmail = {
  email: 'demouser@cod.be'
};

const wrongUserEmail = {
  email: 'wrongdemouser@cod.be'
};

const invalidUserEmail = {
  email: 'wrongdemouser@cod'
};

const userPassword = {
  password: 'updated@Pass123'
};

const invalidUserPassword = {
  password: 'updated'
};

let emailToken;

describe('Password Reset Testing', () => {
  it('It Should Request For A Password Reset', async () => {
    const res = await request(server)
      .post('/api/v1/forgot-password')
      .send(userEmail);
    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property('Message');
    expect(res.body.data).to.have.property('emailToken');
    emailToken = res.body.data.emailToken;
  });

  it('It Should GET the Request For A Password Reset', async () => {
    const res = await request(server).get('/api/v1/reset-password');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').and.to.be.eql(200);
    expect(res.body.data)
      .to.have.property('Message')
      .and.to.be.eql(
        'Send A PATCH Request to the link below to update your password'
      );
    expect(res.body.data).to.have.property('Link');
  });

  it('It Should Throw A Password Validation Error When User Enters Invalid Password', async () => {
    const res = await request(server)
      .patch(`/api/v1/reset-password?token=${emailToken}`)
      .send(invalidUserPassword);
    expect(res).to.have.status(400);
    expect(res.body)
      .to.have.property('Error')
      .and.to.be.eql(
        'Password:eight characters, at least one letter, one number and one special character'
      );
  });

  it('It Should Update A Newly Assigned Password If Token Is Valid', async () => {
    const res = await request(server)
      .patch(`/api/v1/reset-password?token=${emailToken}`)
      .send(userPassword);
    expect(res).to.have.status(200);
    expect(res.body.data)
      .to.have.property('message')
      .and.to.be.eql('Password Updated successfully');
  });

  it('It Should Throw A Not Found Error When User Enters Invalid Credentials', async () => {
    const res = await request(server)
      .post('/api/v1/forgot-password')
      .send(wrongUserEmail);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('Error').and.to.be.eql('User Not Found');
    expect(res.body).to.have.property('status').and.to.be.eql(404);
  });

  it('It Should Throw An Email Validation Error When User Enters Invalid Email', async () => {
    const res = await request(server)
      .post('/api/v1/forgot-password')
      .send(invalidUserEmail);
    expect(res).to.have.status(400);
    expect(res.body)
      .to.have.property('Error')
      .and.to.be.eql('Email is required,lowercase and valid');
  });

  it('It Should Reject Password Reset With Invalid Token', async () => {
    const newEmailToken = emailToken + 'bad';
    const res = await request(server)
      .patch(`/api/v1/reset-password?token=${newEmailToken}`)
      .send(userPassword);
    expect(res).to.have.status(401);
    expect(res.body.data).to.have.property('Message');
  });
});
