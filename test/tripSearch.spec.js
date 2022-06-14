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

describe('Search in trip requests', () => {
  let adminLoginToken;
  let loginToken;
  let newUserId;
  const loginAdmin = {
    email: 'superadmin@gmail.com',
    password: 'test@me123'
  };
  const user = {
    email: 'tripsearcher@me.com',
    password: 'test@me123'
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
    const trip = {
      departure: 'Huye',
      destination: ['Kayonza'],
      dateOfTravel: '2022-04-24',
      dateOfReturn: '2022-04-28',
      accomodationId: 2,
      userId: newUserId,
      travelReason: 'This is travel reason in test'
    };
    const newTrip = await tripService.createTripRequest(trip);
  });

  describe('/Search in trip requests', () => {
    it('Login a user', async () => {
      const res = await chai.request(app).post('/api/user/login').send(user);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
      loginToken = res.body.accessToken;
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

    it('It should change the user role to Travel administrator', async () => {
      const res = await chai
        .request(app)
        .patch('/api/v1/users/assignRole')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send({ rolename: 'Travel Administrator', user: newUserId });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('message');
    });
    //Travel administrator search requests
    it('It should search by name on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?name=faustin`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by email on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?email=tripsearcher@me.com`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by destination on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?destination=Rwamagana`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by departure on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?departure=Muhanga`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by duration on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?duration=4`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by start date on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?startDate=2022-04-24`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by current status on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?currentStatus=approved`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by departure and destination on Travel Administrator request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?departure=Huye&destination=Kayonza`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    //Manager search requests
    it('It should change the user role to Manager', async () => {
      const res = await chai
        .request(app)
        .patch('/api/v1/users/assignRole')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send({ rolename: 'Manager', user: newUserId });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('message');
    });

    it('It should search by name on Manager request', async () => {
      const accommodation = await Accomodation.findOne({ where: { id: 2 } });
      accommodation.managerId = newUserId;
      accommodation.save();
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?name=Faustin`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by email on Manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?email=@me.com`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by destination on manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?destination=Kayonza`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by departure on manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?departure=Huye`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by duration on Travel Manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?duration=4`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by start date on manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?startDate=2022-04-24`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by current status on manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?currentStatus=approved`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by departure and destination on Manager request', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?departure=Huye&destination=Kayonza`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    //Trip requester search requests
    it('It should change the user role to Requester', async () => {
      const res = await chai
        .request(app)
        .patch('/api/v1/users/assignRole')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send({ rolename: 'Requester', user: newUserId });
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('message');
    });

    it('It should search by name on Requester', async () => {
      const accommodation = await Accomodation.findOne({ where: { id: 2 } });
      accommodation.managerId = newUserId;
      accommodation.save();
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?name=Faustin`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by email on Requester', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?email=tripsearcher@me.com`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by destination on requester user', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?destination=Kayonza`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });

    it('It should search by departure on requester user', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?departure=Huye`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by duration on requester', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?duration=4`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by start date on requester user', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?startDate=2022-04-24`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by current status on requester user', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?currentStatus=pending`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
    it('It should search by departure and destination on requester user', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/trip/search/byKey?departure=Huye&destination=Kayonza`)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(200);
      expect(res.body.data.data).to.have.property('trips');
    });
  });
});
