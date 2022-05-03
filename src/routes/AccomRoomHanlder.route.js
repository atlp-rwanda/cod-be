import express from 'express';
import { roomController } from '../controllers';
import { validate, errorHandler, isLoggedIn } from '../middlewares';
import {
  isRequester,
  isManagerUser,
  adminUser
} from '../middlewares/authorize';
import {
  roomSchema,
  updatedRoomSchema,
  bookingSchema,
  checkInorCheckoutSchema
} from '../validations';

const roomRoute = express.Router();

roomRoute.get('/', isLoggedIn, errorHandler(roomController.getAllRooms));

roomRoute.post(
  '/new',
  isLoggedIn,
  adminUser,
  validate(roomSchema),
  errorHandler(roomController.createRoom)
);

roomRoute.patch(
  '/update/:roomId',
  isLoggedIn,
  adminUser,
  validate(updatedRoomSchema),
  errorHandler(roomController.updateRoom)
);

roomRoute.delete(
  '/remove/:roomId',
  isLoggedIn,
  adminUser,
  errorHandler(roomController.deleteRoom)
);

roomRoute.post(
  '/bookings/new',
  isLoggedIn,
  isRequester,
  validate(bookingSchema),
  errorHandler(roomController.bookRoom)
);

roomRoute.get(
  '/bookings',
  isLoggedIn,
  errorHandler(roomController.getAllBookings)
);

roomRoute.delete(
  '/bookings/cancel/:bookingId',
  isLoggedIn,
  isRequester,
  errorHandler(roomController.removeRoomBooking)
);

roomRoute.patch(
  '/bookings/checkInOrCheckOut/:bookingId',
  isLoggedIn,
  isManagerUser,
  validate(checkInorCheckoutSchema),
  errorHandler(roomController.roomCheckInOrCheckOut)
);

roomRoute.delete(
  '/bookings/delete/:bookingId',
  isLoggedIn,
  isManagerUser,
  errorHandler(roomController.deleteRoomBooking)
);

export default roomRoute;
