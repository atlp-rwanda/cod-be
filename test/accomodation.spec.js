import chai from 'chai';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import models from '../src/database/models';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const { Users, Accomodation, FacilityCommponent } = models;
chai.should();

use(chaiHttp);

let loginToken;
const idUser = uuidv4();

const loginAdmin = {
  email: 'admin@test.com',
  password: 'test@me123'
};

const accomodation = {
  name: 'SERENA',
  description: 'SERENA HOTEL',
  location: 'Kigali',
  longitude: '-1232322',
  latitude: '-23421122'
};
const facility = {
  accomodation: '1',
  name: 'Rooms',
  description: 'Best rooms for accomodation'
};

const component = {
  facility: '1',
  description: 'string',
  image: 'string',
  quantity: '10',
  price: '10$',
  allowBooking: 'false'
};
const componentupdate = {
  facility: '1',
  description: 'string',
  image: 'stringpath',
  quantity: '4',
  price: '40$',
  allowBooking: 'true'
};

const facilityupdate = {
  accomodation: '1',
  name: 'Rooms for Accomodation',
  description: 'Best rooms for accomodation'
};

describe('/Handle Accomodation CRUD operations', () => {
  after(async () => {
    await Users.destroy({ where: { email: 'admin@test.com' } });
  });

  after(async () => {
    await Accomodation.destroy({ where: { name: 'SERENA' } });
  });

  before(async () => {
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash('test@me123', salt);
    const admin = {
      id: idUser,
      firstname: 'Faustin',
      lastname: 'IYAREMYE',
      email: 'admin@test.com',
      password: userPassword,
      isVerified: true,
      roleId: 2
    };
    await Users.create(admin);
  });

  it('It should login Admin User for CRUD operations', async () => {
    const res = await chai
      .request(app)
      .post('/api/user/login')
      .send(loginAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
    loginToken = res.body.accessToken;
  });

  it('It should register an Accomodation ', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/accommodations/register')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property('message');
  });

  it('It should get all accomodations', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/accommodations')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('accommodations');
  });
  it('It should get accomodation by Id', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/accommodations/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('accommodations');
  });

  it('It should update Accomodation ', async () => {
    const accomodation = {
      name: 'SERENA',
      description: 'SERENA HOTEL KIGALI',
      location: 'Kigali',
      longitude: '-1232322',
      latitude: '-23421122'
    };

    const res = await chai
      .request(app)
      .patch('/api/v1/accommodations/update/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });

  /**
   * Accomodation facilities
   */
  it('It should register Accomodation Facility', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/facilities/register')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(facility);
    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property('message');
  });

  it('It ahould update Accomodation Facility', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/facilities/update/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(facilityupdate);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });

  it('It should get facilities in Accomodation', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/facilities/all/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('facilities');
  });
  it('It should get facility by Id', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/facilities/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('facility');
  });

  it('It should remove accomodation by Id', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/accommodations/remove/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
  /**
   * Facilitiy components
   */
  it('It should add a facility component', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/facility/components')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(component);
    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property('message');
  });

  it('It should update a facility component', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/facility/components/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(componentupdate);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
  it('It should get a component by facility Id', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/facility/components/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(componentupdate);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('allComponents');
  });

  it('It should remove a component by Id', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/facility/components/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(componentupdate);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
  it('It should remove facility by Id', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/facilities/delete/1')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
});
