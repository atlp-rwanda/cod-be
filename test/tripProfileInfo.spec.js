import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

const { TripProfileInfo, Users } = models;
chai.should();
use(chaiHttp);

let loginToken,
  today = new Date();

const tripProfileInfo = {
  departure: 'Huye',
  destination: 'Kayonza',
  dateOfTravel: today.setDate(new Date().getDate() + 1),
  dateOfReturn: today.setDate(new Date().getDate() + 2),
  accomodationId: 2,
  travelReason: 'This is travel reason in test',
  saveInfo: false
};
const tripProfileInfo2 = {
  departure: 'Huye',
  destination: 'Kayonza',
  dateOfTravel: today.setDate(new Date().getDate() + 1),
  dateOfReturn: today.setDate(new Date().getDate() + 2),
  accomodationId: 2,
  travelReason: 'This is travel reason in test',
  saveInfo: true
};

before(async () => {
  const res = await request(server).post('/api/user/login').send({
    email: 'demouser2@cod.be',
    password: 'altp6@random'
  });
  loginToken = res.body.accessToken;
});

describe('Profile Information From Trip Request', () => {
  describe('/POST api/v1/trip/', () => {
    it('Should validate saveInfo from req.body', async () => {
      const requester = request(server).keepOpen();
      tripProfileInfo.saveInfo = '';
      tripProfileInfo2.saveInfo = 2;
      const [badReq, badReq2] = await Promise.all([
        requester
          .post('/api/v1/trip')
          .set('Authorization', `Bearer ${loginToken}`)
          .send(tripProfileInfo),
        requester
          .post('/api/v1/trip')
          .set('Authorization', `Bearer ${loginToken}`)
          .send(tripProfileInfo2)
      ]);
      expect(badReq).to.have.status(400);
      expect(badReq.body).to.have.property('data');
      expect(badReq.body.data)
        .to.have.property('message')
        .and.to.be.eql('saveInfo must be a boolean');

      expect(badReq2).to.have.status(400);
      expect(badReq2.body).to.have.property('data');
      expect(badReq2.body.data)
        .to.have.property('message')
        .and.to.be.eql('saveInfo must be a boolean');
    });

    it('Should Not Save Profile Info If Checkbox Is Unchecked', async () => {
      tripProfileInfo.saveInfo = false;
      const res = await chai
        .request(server)
        .post('/api/v1/trip')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(tripProfileInfo);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data)
        .to.have.property('message')
        .and.to.be.eql('New trip request made successfully');
    });
  });

  it('Should Save Profile Info From Trip Req.', async () => {
    const requester = request(server).keepOpen();
    tripProfileInfo.saveInfo = true;
    const [req] = await Promise.all([
      requester
        .post('/api/v1/trip')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(tripProfileInfo)
    ]);
    expect(req).to.have.status(201);
    expect(req.body).to.have.property('data');
    expect(req.body.data)
      .to.have.property('message')
      .and.to.be.eql('New trip request made successfully and info saved');
  });

  it('Should Update Profile Info If Exist', async () => {
    const requester = request(server).keepOpen();
    tripProfileInfo.saveInfo = true;
    const [req] = await Promise.all([
      requester
        .post('/api/v1/trip')
        .set('Authorization', `Bearer ${loginToken}`)
        .send(tripProfileInfo)
    ]);
    expect(req).to.have.status(201);
    expect(req.body).to.have.property('data');
    expect(req.body.data)
      .to.have.property('message')
      .and.to.be.eql('New trip request made successfully and info updated');
  });

  describe('/GET api/v1/trip/profile/info', () => {
    it('Should get tripProfileInfo of user', async () => {
      const requester = request(server).keepOpen();
      const [req] = await Promise.all([
        requester
          .get('/api/v1/trip/profile/info')
          .set('Authorization', `Bearer ${loginToken}`)
      ]);
      expect(req).to.have.status(200);
      expect(req.body).to.have.property('data');
      expect(req.body.data.message).to.be.eql('Profile fetched successfully');
      expect(req.body.data).to.have.property('data').and.to.be.an('object');
    });
  });
});
