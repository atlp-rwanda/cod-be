import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import models from '../src/database/models';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const { Users, Accomodation, Facility, FacilityComponent } = models;
chai.should();

use(chaiHttp);

let loginToken, accomId, facilityId, componentId;
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

describe('/Handle Accomodation CRUD operations', () => {
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
    const accomodations = await Accomodation.findAll({});
    accomId = accomodations[2].dataValues.id;
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
      .get(`/api/v1/accommodations/${accomId}`)
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('accommodations');
  });

  it('It should update Accomodation ', async () => {
    const newAccomodation = {
      name: 'SERENA Kigali',
      description: 'SERENA HOTEL KIGALI',
      location: 'Kigali',
      longitude: '-1232322',
      latitude: '-23421122'
    };
    const res = await chai
      .request(app)
      .patch(`/api/v1/accommodations/update/${accomId}`)
      .set('Authorization', `Bearer ${loginToken}`)
      .send(newAccomodation);
    expect(res).to.have.status(200);
  });

  /**
   * Accomodation facilities
   */
  it('It should register Accomodation Facility', async () => {
    const facility = {
      name: 'Rooms',
      description: 'Best rooms for accomodation',
      accomodation: accomId
    };
    const res = await chai
      .request(app)
      .post('/api/v1/facilities/register')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(facility);
    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property('message');
    const facilities = await Facility.findAll({});
    facilityId = facilities[0].dataValues.id;
  });

  it('It ahould update Accomodation Facility', async () => {
    const facilityUpdate = {
      name: 'Rooms for Accomodation',
      description: 'Best rooms for accomodation',
      accomodation: accomId
    };
    const res = await chai
      .request(app)
      .patch(`/api/v1/facilities/update/${facilityId}`)
      .set('Authorization', `Bearer ${loginToken}`)
      .send(facilityUpdate);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });

  it('It should get facilities in Accomodation', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/facilities/all/${accomId}`)
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('facilities');
  });
  it('It should get facility by Id', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/facilities/${facilityId}`)
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('facility');
  });

  it('It should remove accomodation by Id', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/accommodations/remove/${accomId}`)
      .set('Authorization', `Bearer ${loginToken}`)
      .send(accomodation);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
  /**
   * Facilitiy components
   */
  it('It should add a facility component', async () => {
    const component = {
      facility: facilityId,
      description: 'string',
      image: 'string',
      quantity: '10',
      price: '10$',
      allowBooking: 'false'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/facility/components')
      .set('Authorization', `Bearer ${loginToken}`)
      .send(component);
    expect(res).to.have.status(201);
    expect(res.body.data).to.have.property('message');
    const components = await FacilityComponent.findOne({
      where: { facilityId }
    });
    componentId = components.dataValues.id;
  });

  it('It should update a facility component', async () => {
    const componentupdate = {
      facility: facilityId,
      description: 'string',
      image: 'stringpath',
      quantity: '4',
      price: '40$',
      allowBooking: 'true'
    };
    const res = await chai
      .request(app)
      .patch(`/api/v1/facility/components/${componentId}`)
      .set('Authorization', `Bearer ${loginToken}`)
      .send(componentupdate);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
  it('It should get a component by facility Id', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/facility/components/${facilityId}`)
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('allComponents');
  });

  it('It should remove a component by Id', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/facility/components/${componentId}`)
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
  it('It should remove facility by Id', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/facilities/delete/${facilityId}`)
      .set('Authorization', `Bearer ${loginToken}`);
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });
});
