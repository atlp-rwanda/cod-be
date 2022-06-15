import chai, { expect, request, should, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import models from '../src/database/models';
import * as userService from '../src/services/userService';
import { tripService } from '../src/services';
import bcrypt from 'bcrypt';

const { Users, Accomodation, Trips } = models;
chai.should();

use(chaiHttp);

describe('Manage user notifications', () => {
  let adminLoginToken;
  let loginToken;
  let newUserId;
  let tripId;
  let notificationId;
  let today = new Date();
  const loginAdmin = {
    email: 'superadmin@gmail.com',
    password: 'test@me123'
  };
  const user = {
    email: 'tripsearcher@me.com',
    password: 'test@me123'
  };
  const newTrip = {
    departure: 'Huye',
    destination: 'Kayonza',
    dateOfTravel: today.setDate(new Date().getDate() + 1),
    dateOfReturn: today.setDate(new Date().getDate() + 2),
    accomodationId: 2,
    travelReason: 'This is travel reason in test'
  };
  after(async () => {
    await Users.destroy({ where: { email: 'tripsearcher@me.com' } });
  });

  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash('test@me123', salt);
    const userData = {
      firstname: 'Faustin',
      lastname: 'IYAREMYE',
      email: 'tripsearcher@me.com',
      isVerified: true,
      password: userPassword
    };
    const userAdded = await userService.addUser(userData);
    newUserId = userAdded.id;
  });

  describe('/Tests in user notifications', () => {
    it('Login a user', async () => {
      const res = await chai.request(app).post('/api/user/login').send(user);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
      loginToken = res.body.accessToken;
    });

    it('Should make new trip request', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/trip')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(newTrip);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('New trip request made successfully');
      tripId = res.body.data.data.id;
    });

    it('It should login Super Admin User', async () => {
      const res = await chai
        .request(app)
        .post('/api/user/login')
        .send(loginAdmin);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
      adminLoginToken = res.body.accessToken;
    });

    //Manager notifications
    it('It should change the user role to Manager', async () => {
      const res = await chai
        .request(app)
        .patch('/api/v1/users/assignRole')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send({ rolename: 'Manager', user: newUserId });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('message');
    });

    it('It should get all trip notifications as Accomodation Manager', async () => {
      const accommodation = await Accomodation.findOne({ where: { id: 2 } });
      accommodation.managerId = newUserId;
      accommodation.save();
      const res = await chai
        .request(app)
        .get(`/api/v1/notifications`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data[0]).to.have.property('title');
      notificationId = res.body.data.data[0].id;
    });
    it('It should get trip notification by Id as Accomodation Manager', async () => {
      const accommodation = await Accomodation.findOne({ where: { id: 2 } });
      accommodation.managerId = newUserId;
      accommodation.save();
      const res = await chai
        .request(app)
        .get(`/api/v1/${notificationId}/notifications`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('title');
    });
    it('Should Approve A Trip Request by Manager', async () => {
      const res = await chai
        .request(app)
        .patch(`/api/v1/trip/approve_reject/${tripId}`)
        .set('Authorization', `Bearer ${loginToken}`)
        .send({ status: 'approved' });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
    });
    //Trip  notifications for requester
    it('It should change the user role to Requester', async () => {
      const res = await chai
        .request(app)
        .patch('/api/v1/users/assignRole')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send({ rolename: 'Requester', user: newUserId });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('message');
    });
    it('It should get all trip notifications as requester', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/notifications`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('data');
    });
    it('It should get trip notification by Id as requester', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/${notificationId}/notifications`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('title');
    });
    it('It should block application notifications', async () => {
      const res = await chai
        .request(app)
        .post(`/api/v1/notifications/status`)
        .set('Authorization', `Bearer ${loginToken}`)
        .send({ type: 'application', status: 'false' });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('data');
    });
    it('It should not get trip notifications when they are blocked', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/notifications`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(404);
      expect(res.body.Error).to.have.property('data');
    });
    it('It should unblock application notifications', async () => {
      const res = await chai
        .request(app)
        .post(`/api/v1/notifications/status`)
        .set('Authorization', `Bearer ${loginToken}`)
        .send({ type: 'application', status: 'true' });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('data');
    });
    it('It should get all trip notifications when unblocked', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/notifications`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('data');
    });
    it('The user logged in can mark notification as read', async () => {
      const res2 = await chai
        .request(app)
        .post(`/api/v1/read/notification/${notificationId}`)
        .set({ Authorization: `Bearer ${loginToken}` });
      expect(res2).to.have.property('status', 200);
      expect(res2.body.data).to.have.property(
        'message',
        `Notification marked as read succesfully`
      );
    });
    it('The Notification read can not be read again', async () => {
      const res2 = await chai
        .request(app)
        .post(`/api/v1/read/notification/${notificationId}`)
        .set({ Authorization: `Bearer ${loginToken}` });
      expect(res2).to.have.property('status', 200);
      expect(res2.body.data).to.have.property(
        'message',
        `The notification is already read`
      );
    });
    it('If notification does not exist user can not read it', async () => {
      const res2 = await chai
        .request(app)
        .post(`/api/v1/read/notification/0c58cb56-40f7-4e5b-905e-b7a915604253`)
        .set({ Authorization: `Bearer ${loginToken}` });
      expect(res2).to.have.property('status', 404);
      expect(res2.body).to.have.property('Error', `Notification not found`);
    });
    it('If user has no notification can not mark them', async () => {
      const res2 = await chai
        .request(app)
        .post(`/api/v1/read/notifications`)
        .set({ Authorization: `Bearer ${loginToken}` });
      expect(res2).to.have.property('status', 404);
      expect(res2.body).to.have.property('Error', `You have no notification`);
    });
  });
});
