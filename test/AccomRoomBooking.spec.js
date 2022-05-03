import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

chai.should();
use(chaiHttp);

let adminLoginToken,
  managerLoginToken,
  requesterLoginToken,
  badRequesterLoginToken,
  roomId,
  bookingId;

const testData = {
  travelAdmin: {
    email: 'mcy@cod.com',
    password: 'Kigali'
  },
  accomManager: {
    email: 'manager1@cod.be',
    password: 'altp6@random'
  },
  newRoom: {
    accomodationId: 4,
    roomNumber: 4,
    images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  badnewRoom1: {
    accomodationId: 1012,
    roomNumber: 4,
    images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  badnewRoom2: {
    accomodationId: 4,
    roomNumber: 'a',
    images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  badnewRoom3: {
    accomodationId: 'wqe12',
    roomNumber: 'a',
    images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  badnewRoom4: {
    accomodationId: 4,
    roomNumber: 4,
    images: 5,
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  roomUpdate: {
    images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  badRoomUpdate1: {
    images: 5,
    description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
  },
  badRoomUpdate2: {
    images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
    description: 5
  },
  availableReq: {
    status: 'available'
  },
  bookedReq: {
    status: 'booked'
  },
  newBooking: {
    tripId: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cd',
    roomId: 'e86879aa-6fe7-433a-9071-3737f523daaf'
  },
  pendingTripBooking: {
    tripId: '5ded92bb-69c2-414c-8ad8-7c0f4096e9ce',
    roomId: 'e86879aa-6fe7-433a-9071-3737f523daaf'
  },
  rejectedTripBooking: {
    tripId: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cf',
    roomId: 'e86879aa-6fe7-433a-9071-3737f523daaf'
  },
  badBooking1: {
    tripId: 40,
    roomId: 'e86879aa-6fe7-433a-9071-3737f523daaf'
  },
  badBooking2: {
    tripId: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cd',
    roomId: 40
  },
  badBooking3: {
    tripId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c831',
    roomId: 'e86879aa-6fe7-433a-9071-3737f523daaf'
  },
  checkInReq: {
    status: 'checkedIn'
  },
  checkOutReq: {
    status: 'checkedOut'
  },
  badCheckInReq: {
    status: 'checked'
  },
  BadcheckInOrOutReq: {
    status: 'checked'
  },
  randomUser: {
    email: 'random@gmail.com',
    password: 'altp6@random'
  },
  badRandomUser: {
    email: 'kevin@cod.com',
    password: 'Kigali'
  },
  wrongRoomId: {
    roomId: '861d7c9d-a8a8-4308-bce8-2c6c6a66c832'
  },
  bookedRoomId: {
    roomId: 'ffc5ba75-1703-44bd-b000-a19f0dd445cb'
  },
  wrongBookingId: {
    bookingId: 'ffc5ba75-1703-44bd-b000-a19f0dd445cd'
  },
  CheckInBookingId: {
    bookingId: '4f8ff145-4986-4a4d-a2a6-01d66ba5bd74'
  },
  CheckedInBookingId: {
    bookingId: '6f007ed5-ed85-475f-a772-9922dfcac30c'
  }
};

before(async () => {
  const adminLogin = await chai
    .request(server)
    .post('/api/user/login')
    .send(testData.travelAdmin);
  adminLoginToken = adminLogin.body.accessToken;

  const managerLogin = await chai
    .request(server)
    .post('/api/user/login')
    .send(testData.accomManager);
  managerLoginToken = managerLogin.body.accessToken;

  const requesterLogin = await chai
    .request(server)
    .post('/api/user/login')
    .send(testData.randomUser);
  requesterLoginToken = requesterLogin.body.accessToken;

  const badRequesterLogin = await chai
    .request(server)
    .post('/api/user/login')
    .send(testData.badRandomUser);
  badRequesterLoginToken = badRequesterLogin.body.accessToken;
});

describe('CRUD Rooms In An Accomodation', () => {
  it('It Should Validate Room Request Body & Create A New Room', async () => {
    const requester = chai.request(server).keepOpen();
    const [badReq1, badReq2, badReq3, badReq4, newRoomReq] = await Promise.all([
      requester
        .post('/api/v1/rooms/new')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.badnewRoom1),
      requester
        .post('/api/v1/rooms/new')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.badnewRoom2),
      requester
        .post('/api/v1/rooms/new')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.badnewRoom3),
      requester
        .post('/api/v1/rooms/new')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.badnewRoom4),
      requester
        .post('/api/v1/rooms/new')
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.newRoom)
    ]);

    expect(badReq1).to.have.status(404);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    expect(badReq2).to.have.status(400);
    expect(badReq2.body).to.have.property('data');
    expect(badReq2.body.data).to.have.property('message');

    expect(badReq3).to.have.status(400);
    expect(badReq3.body).to.have.property('data');
    expect(badReq3.body.data).to.have.property('message');

    expect(badReq4).to.have.status(400);
    expect(badReq4.body).to.have.property('data');
    expect(badReq4.body.data).to.have.property('message');

    expect(newRoomReq).to.have.status(201);
    expect(newRoomReq.body.data).to.have.property('data');

    roomId = newRoomReq.body.data.data.id;
    requester.close();
  });

  it('It Should Get All Available Rooms & Booked Rooms As A Trip Admin Or Manager', async () => {
    const requester = chai.request(server).keepOpen();
    const [availableReq, bookedReq] = await Promise.all([
      requester
        .get(`/api/v1/rooms?status=${testData.availableReq.status}`)
        .set('Authorization', `Bearer ${adminLoginToken}`),
      requester
        .get(`/api/v1/rooms?status=${testData.bookedReq.status}`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
    ]);

    expect(availableReq).to.have.status(200);
    expect(availableReq.body).to.have.property('data');
    expect(availableReq.body.data).to.have.property('message');

    expect(bookedReq).to.have.status(200);
    expect(bookedReq.body).to.have.property('data');
    expect(bookedReq.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Get All Available Rooms As A Trip Requester', async () => {
    const requester = chai.request(server).keepOpen();
    const [availableReq, bookedReq] = await Promise.all([
      requester
        .get(`/api/v1/rooms?status=${testData.availableReq.status}`)
        .set('Authorization', `Bearer ${requesterLoginToken}`),
      requester
        .get(`/api/v1/rooms?status=${testData.bookedReq.status}`)
        .set('Authorization', `Bearer ${requesterLoginToken}`)
    ]);

    expect(availableReq).to.have.status(200);
    expect(availableReq.body).to.have.property('data');
    expect(availableReq.body.data).to.have.property('message');

    expect(bookedReq).to.have.status(403);
    expect(bookedReq.body).to.have.property('data');
    expect(bookedReq.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Not Update Room With Validation Error', async () => {
    const requester = chai.request(server).keepOpen();
    const [badReq1, badReq2] = await Promise.all([
      requester
        .patch(`/api/v1/rooms/update/${roomId}`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.badRoomUpdate1),
      requester
        .patch(`/api/v1/rooms/update/${roomId}`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.badRoomUpdate2)
    ]);

    expect(badReq1).to.have.status(400);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    expect(badReq2).to.have.status(400);
    expect(badReq2.body).to.have.property('data');
    expect(badReq2.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Update Room With No Validation Error', async () => {
    const requester = chai.request(server).keepOpen();
    const [updatedReq, badReq1] = await Promise.all([
      requester
        .patch(`/api/v1/rooms/update/${roomId}`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.roomUpdate),
      requester
        .patch(`/api/v1/rooms/update/${testData.wrongRoomId.roomId}`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
        .send(testData.roomUpdate)
    ]);

    expect(updatedReq).to.have.status(200);
    expect(updatedReq.body).to.have.property('data');
    expect(updatedReq.body.data).to.have.property('message');

    expect(badReq1).to.have.status(404);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Delete Room', async () => {
    const requester = chai.request(server).keepOpen();
    const [deleteReq, badReq1] = await Promise.all([
      requester
        .delete(`/api/v1/rooms/remove/${roomId}`)
        .set('Authorization', `Bearer ${adminLoginToken}`),
      requester
        .delete(`/api/v1/rooms/remove/${testData.bookedRoomId.roomId}`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
    ]);

    expect(deleteReq).to.have.status(202);
    expect(deleteReq.body).to.have.property('data');
    expect(deleteReq.body.data).to.have.property('message');

    expect(badReq1).to.have.status(409);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    requester.close();
  });
});

describe('CRUD Bookings In Accomodation Rooms', async () => {
  it('It Should Validate Booking Request Body & Create A New Booking', async () => {
    const requester = chai.request(server).keepOpen();
    const [badReq1, badReq2, badReq3, badReq4, badReq5, newBookingReq] =
      await Promise.all([
        requester
          .post('/api/v1/rooms/bookings/new')
          .set('Authorization', `Bearer ${requesterLoginToken}`)
          .send(testData.pendingTripBooking),
        requester
          .post('/api/v1/rooms/bookings/new')
          .set('Authorization', `Bearer ${requesterLoginToken}`)
          .send(testData.rejectedTripBooking),
        requester
          .post('/api/v1/rooms/bookings/new')
          .set('Authorization', `Bearer ${requesterLoginToken}`)
          .send(testData.badBooking1),
        requester
          .post('/api/v1/rooms/bookings/new')
          .set('Authorization', `Bearer ${requesterLoginToken}`)
          .send(testData.badBooking2),
        requester
          .post('/api/v1/rooms/bookings/new')
          .set('Authorization', `Bearer ${requesterLoginToken}`)
          .send(testData.badBooking3),
        requester
          .post('/api/v1/rooms/bookings/new')
          .set('Authorization', `Bearer ${requesterLoginToken}`)
          .send(testData.newBooking)
      ]);

    expect(badReq1).to.have.status(409);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    expect(badReq2).to.have.status(409);
    expect(badReq2.body).to.have.property('data');
    expect(badReq2.body.data).to.have.property('message');

    expect(badReq3).to.have.status(400);
    expect(badReq3.body).to.have.property('data');
    expect(badReq3.body.data).to.have.property('message');

    expect(badReq4).to.have.status(400);
    expect(badReq4.body).to.have.property('data');
    expect(badReq4.body.data).to.have.property('message');

    expect(badReq5).to.have.status(404);
    expect(badReq5.body).to.have.property('data');
    expect(badReq5.body.data).to.have.property('message');

    expect(newBookingReq).to.have.status(201);
    expect(newBookingReq.body).to.have.property('data');
    expect(newBookingReq.body.data).to.have.property('message');

    bookingId = newBookingReq.body.data.data.id;
    requester.close();
  });

  it('It Should Not Book Room If User Is Not The Trip Owner', async () => {
    const requester = chai.request(server).keepOpen();
    const [newBookingReq] = await Promise.all([
      requester
        .post('/api/v1/rooms/bookings/new')
        .set('Authorization', `Bearer ${badRequesterLoginToken}`)
        .send(testData.newBooking)
    ]);

    expect(newBookingReq).to.have.status(403);
    expect(newBookingReq.body).to.have.property('data');
    expect(newBookingReq.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Get All Available Rooms & Booked Rooms', async () => {
    const requester = chai.request(server).keepOpen();
    const [bookingsReq] = await Promise.all([
      requester
        .get(`/api/v1/rooms/bookings`)
        .set('Authorization', `Bearer ${adminLoginToken}`)
    ]);

    expect(bookingsReq).to.have.status(200);
    expect(bookingsReq.body).to.have.property('data');
    expect(bookingsReq.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Delete Booking Request As A Requester', async () => {
    const requester = chai.request(server).keepOpen();
    const [deleteReq, badReq1, badReq2] = await Promise.all([
      requester
        .delete(`/api/v1/rooms/bookings/cancel/${bookingId}`)
        .set('Authorization', `Bearer ${requesterLoginToken}`),
      requester
        .delete(
          `/api/v1/rooms/bookings/cancel/${testData.wrongBookingId.bookingId}`
        )
        .set('Authorization', `Bearer ${requesterLoginToken}`),
      requester
        .delete(`/api/v1/rooms/bookings/cancel/${bookingId}`)
        .set('Authorization', `Bearer ${badRequesterLoginToken}`)
    ]);

    expect(deleteReq).to.have.status(202);
    expect(deleteReq.body).to.have.property('data');
    expect(deleteReq.body.data).to.have.property('message');

    expect(badReq1).to.have.status(404);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    expect(badReq2).to.have.status(403);
    expect(badReq2.body).to.have.property('data');

    requester.close();
  });

  it('It Should Not Update Room Booking With Validation Error', async () => {
    const requester = chai.request(server).keepOpen();
    const [badReq1, badReq2] = await Promise.all([
      requester
        .patch(`/api/v1/rooms/bookings/checkInOrCheckOut/${bookingId}`)
        .set('Authorization', `Bearer ${managerLoginToken}`)
        .send(testData.badCheckInReq),
      requester
        .patch(
          `/api/v1/rooms/bookings/checkInOrCheckOut/${testData.wrongBookingId.bookingId}`
        )
        .set('Authorization', `Bearer ${managerLoginToken}`)
        .send(testData.checkInReq)
    ]);

    expect(badReq1).to.have.status(400);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');

    expect(badReq2).to.have.status(404);
    expect(badReq2.body).to.have.property('data');
    expect(badReq2.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Check In Room With No Validation Error', async () => {
    const checkInReq = await chai
      .request(server)
      .patch(
        `/api/v1/rooms/bookings/checkInOrCheckOut/${testData.CheckInBookingId.bookingId}`
      )
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.checkInReq);
    expect(checkInReq).to.have.status(200);
    expect(checkInReq.body).to.have.property('data');
    expect(checkInReq.body.data).to.have.property('message');
  });

  it('It Throw An Error If Room Is Checked In Already', async () => {
    const badReq1 = await chai
      .request(server)
      .patch(
        `/api/v1/rooms/bookings/checkInOrCheckOut/${testData.CheckInBookingId.bookingId}`
      )
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.checkInReq);
    expect(badReq1).to.have.status(400);
    expect(badReq1.body).to.have.property('data');
    expect(badReq1.body.data).to.have.property('message');
  });

  it('It Should Check Out Room With No Validation Error', async () => {
    const checkOutReq = await chai
      .request(server)
      .patch(
        `/api/v1/rooms/bookings/checkInOrCheckOut/${testData.CheckInBookingId.bookingId}`
      )
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.checkOutReq);
    expect(checkOutReq).to.have.status(200);
    expect(checkOutReq.body).to.have.property('data');
    expect(checkOutReq.body.data).to.have.property('message');
  });

  it('It Throw An Error If Room Is Checked Out Already', async () => {
    const badReq2 = await chai
      .request(server)
      .patch(
        `/api/v1/rooms/bookings/checkInOrCheckOut/${testData.CheckInBookingId.bookingId}`
      )
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.checkOutReq);
    expect(badReq2).to.have.status(400);
    expect(badReq2.body).to.have.property('data');
    expect(badReq2.body.data).to.have.property('message');
  });

  it('It Should Delete Booking Request As A Travel Manager', async () => {
    const requester = chai.request(server).keepOpen();
    const [deleteReq] = await Promise.all([
      requester
        .delete(
          `/api/v1/rooms/bookings/delete/${testData.CheckedInBookingId.bookingId}`
        )
        .set('Authorization', `Bearer ${managerLoginToken}`)
    ]);

    expect(deleteReq).to.have.status(202);
    expect(deleteReq.body).to.have.property('data');
    expect(deleteReq.body.data).to.have.property('message');

    requester.close();
  });

  it('It Should Not Delete A Checked In Booking Request ', async () => {
    const newRoom = await chai
      .request(server)
      .post('/api/v1/rooms/new')
      .set('Authorization', `Bearer ${adminLoginToken}`)
      .send({
        accomodationId: 4,
        roomNumber: 21,
        images: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop',
        description: 'qwertyuiopqwertyuiop,qwertyuiopqwertyuiop'
      });
    const newBooking = await chai
      .request(server)
      .post('/api/v1/rooms/bookings/new')
      .set('Authorization', `Bearer ${requesterLoginToken}`)
      .send({
        tripId: '5ded92bb-69c2-414c-8ad8-7c0f4096e9cd',
        roomId: `${newRoom.body.data.data.id}`
      });
    await chai
      .request(server)
      .patch(
        `/api/v1/rooms/bookings/checkInOrCheckOut/${newBooking.body.data.data.id}`
      )
      .set('Authorization', `Bearer ${managerLoginToken}`)
      .send(testData.checkInReq);

    const requester = chai.request(server).keepOpen();
    const [deleteReq] = await Promise.all([
      requester
        .delete(`/api/v1/rooms/bookings/delete/${newBooking.body.data.data.id}`)
        .set('Authorization', `Bearer ${managerLoginToken}`)
    ]);

    expect(deleteReq).to.have.status(400);
    expect(deleteReq.body).to.have.property('data');
    expect(deleteReq.body.data).to.have.property('message');

    requester.close();
  });
});
