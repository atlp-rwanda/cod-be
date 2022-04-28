import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';
import { tripService } from '../src/services';

const { Trips } = models;
chai.should();
use(chaiHttp);

let loginToken,
  today = new Date(),
  multiCityTripId;

const trip = {
  departure: 'Huye',
  destination: 'Kayonza',
  dateOfTravel: today.setDate(new Date().getDate() + 1),
  dateOfReturn: today.setDate(new Date().getDate() + 2),
  accomodationId: 2,
  travelReason: 'This is travel reason in test'
};

before(async () => {
  const res = await chai.request(server).post('/api/user/login').send({
    email: 'random1@gmail.com',
    password: 'altp6@random'
  });
  loginToken = res.body.accessToken;
});

describe('Trip request', () => {
  let tripId;
  describe('/POST  make new trip request', () => {
    it('Should validate trip request', async () => {
      const multiCityTrip = {
        ...trip,
        destination: ['Rubavu', 'Musanze'],
        accomodationId: 4
      };

      const requester = chai.request(server).keepOpen();
      const [badReq, badReq2, badReq3, badReq4, badReq5, multiCityReq] =
        await Promise.all([
          requester
            .post('/api/v1/trip')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
              destination: 'Kigali'
            }),
          requester
            .post('/api/v1/trip')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
              departure: 'Kigali'
            }),
          requester
            .post('/api/v1/trip')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
              departure: 'Kigali',
              destination: 'Kayonza'
            }),
          requester
            .post('/api/v1/trip')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
              departure: 'Kigali',
              destination: 'Kayonza',
              dateOfTravel: new Date()
            }),
          requester
            .post('/api/v1/trip')
            .set('Authorization', `Bearer ${loginToken}`)
            .send({
              departure: 'Kigali',
              destination: 'Kayonza',
              dateOfTravel: today.setDate(new Date().getDate() + 1),
              dateOfReturn: new Date()
            }),
          requester
            .post('/api/v1/trip')
            .set('Authorization', `Bearer ${loginToken}`)
            .send(multiCityTrip)
        ]);

      expect(badReq).to.have.status(400);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data).to.have.property('error');
      expect(badReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('Place of departure is required');
      expect(badReq2.body.data).to.have.property('error');
      expect(badReq2.body.data)
        .to.have.property('message')
        .and.to.be.eql('Place of destination is required');

      expect(badReq3.body.data).to.have.property('error');
      expect(badReq3.body.data)
        .to.have.property('message')
        .and.to.be.eql('Date of travel is required');

      expect(badReq4.body.data).to.have.property('error');
      expect(badReq4.body.data)
        .to.have.property('message')
        .and.to.be.eql('Date of travel must be greater than or equal to now');

      expect(badReq5.body.data).to.have.property('error');
      expect(badReq5.body.data)
        .to.have.property('message')
        .and.to.be.eql('Date of return should be greater than Date of travel');

      multiCityTripId = multiCityReq.body.data.data.id;

      expect(multiCityReq).to.have.status(201);
      expect(multiCityReq.body.data).to.have.property('data');
      expect(multiCityReq.body.data).to.have.property('data');
      expect(multiCityReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('New trip request made successfully');

      trip.accomodationId = 9;
      const res = await chai
        .request(server)
        .post('/api/v1/trip')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(trip);
      expect(res.body).to.be.eql({
        Error: "The accommodation don't have any locations or doesn't exist",
        status: 400
      });
      requester.close();
    });

    it('Should make new trip request', async () => {
      trip.accomodationId = 2;
      const res = await chai
        .request(server)
        .post('/api/v1/trip')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(trip);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('New trip request made successfully');
      tripId = res.body.data.data.id;
    });
  });

  describe('/GET  get trip requests', async () => {
    let undefinedTripId;
    it('Should get all trip requests', async () => {
      const requester = chai.request(server).keepOpen();
      const [res, badRes, badreq3] = await Promise.all([
        requester
          .get('/api/v1/trip')
          .set('Authorization', `Bearer ${loginToken}`),
        requester
          .get('/api/v1/trip/' + '683bff69-ae88-4798-bf51-0ab742c23ffe')
          .set('Authorization', `Bearer ${loginToken}`),
        requester
          .get('/api/v1/trip/' + undefinedTripId)
          .set('Authorization', `Bearer ${loginToken}`)
      ]);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('All your trip requests fetched successfully');

      expect(badRes).to.have.status(404);
      expect(badRes.body).to.have.property('data');
      expect(badRes.body.data)
        .to.have.property('message')
        .and.to.be.eql('Trip not found');

      const { trips } = await tripService.findTripByManagerId(
        'b66cfc7c-be2c-41f5-b459-e888bfe881a6'
      );
      expect(trips).to.be.a('array');
      expect(badreq3).to.have.status(500);
      requester.close();
    });
    it('Should get One trip request', async () => {
      const res = await chai
        .request(server)
        .get('/api/v1/trip/' + tripId)
        .set('Authorization', `Bearer ${loginToken}`)
        .send(trip);

      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('One trip request fetched successfully');

      const multiCityTripRes = await chai
        .request(server)
        .get('/api/v1/trip/' + multiCityTripId)
        .set('Authorization', `Bearer ${loginToken}`)
        .send(trip);
      expect(multiCityTripRes).to.be.a('object');
      expect(multiCityTripRes).to.have.status(200);
      expect(multiCityTripRes.body).to.have.property('data');
      expect(multiCityTripRes.body.data.data)
        .to.have.property('destination')
        .and.to.be.a('array')
        .length.gt(1);
    });
  });
  describe('/PUT  edit trip request', () => {
    it('Should not edit trip request that does not exist', async () => {
      trip.departure = 'Nyaruguru';
      const res = await chai
        .request(server)
        .put('/api/v1/trip/' + '683bff69-ae88-4798-bf51-0ab742c23ffe')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(trip);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Trip not found');
    });
    it('Should not edit trip request that is pending', async () => {
      trip.status = 'approved';
      trip.destination = ['Kigali'];
      await tripService.updateTrip(tripId, trip);
      const res = await chai
        .request(server)
        .put('/api/v1/trip/' + tripId)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('Error');
      expect(res.body.Error).to.be.eql('Not allowed to edit this trip request');
    });
    it('Should update trip request', async () => {
      trip.status = 'pending';
      await tripService.updateTrip(tripId, trip);

      trip.departure = 'Nyaruguru';
      const res = await chai
        .request(server)
        .put('/api/v1/trip/' + tripId)
        .set('Authorization', `Bearer ${loginToken}`)
        .send(trip);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Trip request updated successfully');
    });
  });
  describe('/DELETE   delete trip request', () => {
    it('Should not Delete trip request that does not exist', async () => {
      const res = await chai
        .request(server)
        .delete('/api/v1/trip/' + '683bff69-ae88-4798-bf51-0ab742c23ffe')
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Trip not found');
    });
    it('Should not Delete trip request that is pending', async () => {
      trip.status = 'approved';
      await tripService.updateTrip(tripId, trip);

      const res = await chai
        .request(server)
        .delete('/api/v1/trip/' + tripId)
        .set('Authorization', `Bearer ${loginToken}`);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('Error');
      expect(res.body.Error).to.be.eql(
        'Not allowed to delete this trip request'
      );
    });
    it('Should Delete trip request', async () => {
      trip.status = 'pending';
      await tripService.updateTrip(tripId, trip);
      const res = await chai
        .request(server)
        .delete('/api/v1/trip/' + tripId)
        .set('Authorization', `Bearer ${loginToken}`);
      expect(res).to.have.status(202);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('Trip request deleted successfully');
    });
  });
});
