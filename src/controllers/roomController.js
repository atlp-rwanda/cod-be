import * as ApplicationError from '../utils/errors/applicationsErrors';
import {
  roomService,
  tripService,
  accomService,
  roleService
} from '../services';
import {
  notFoundResponse,
  successResponse,
  createdResponse,
  confictResponse
} from '../utils/responseHandler';

export const getAllRooms = async (req, res) => {
  const userRole = await roleService.getUserRole(req.user.id);
  const { status } = req.query;
  if (
    (userRole === 'Manager' || userRole === 'Travel Administrator') &&
    (status === 'booked' || status === 'available')
  ) {
    const { rooms, error } = await roomService.getAvailableRooms(status);
    if (error) return notFoundResponse(res, error);
    if (rooms) {
      return successResponse(
        res,
        200,
        `All ${status} Rooms In Your Accomodation Retrieved Successfully`,
        rooms
      );
    }
    return ApplicationError.internalServerError(
      `There was a problem Retrieving Avaible Rooms In The Database`,
      error
    );
  }
  if (userRole === 'Requester' && status === 'available') {
    const { rooms, error } = await roomService.getAvailableRooms(status);
    if (error) return notFoundResponse(res, error);
    if (rooms) {
      return successResponse(
        res,
        200,
        `All ${status} Rooms In Your Accomodation Retrieved Successfully`,
        rooms
      );
    }
    return ApplicationError.internalServerError(
      `There was a problem Retrieving Avaible Rooms In The Database`,
      error
    );
  }
  return confictResponse(
    res,
    403,
    `You Are Not Allowed To View ${status} Rooms As A ${userRole}`,
    userRole
  );
};

export const createRoom = async (req, res) => {
  const { accomodationId, roomNumber, images, description } = req.body;
  const isValidAccomodation = await accomService.getById(accomodationId);
  if (!isValidAccomodation) {
    return notFoundResponse(res, 'Accomodation Not Found');
  }
  const imageLinks = images.split(',');
  const newRoom = {
    accomodationId,
    roomNumber,
    images: imageLinks,
    description
  };
  const { createdRoom, error } = await roomService.createNewRoom(newRoom);
  if (!error && createdRoom) {
    return createdResponse(res, 'New Room Created Successfully', createdRoom);
  }
  return confictResponse(
    res,
    400,
    `Can Not Create New Room ${newRoom.roomNumber} In Accomodation ${newRoom.accomodationId}`,
    error
  );
};

export const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const { isValidRoom } = await roomService.findRoomById(roomId);
  if (isValidRoom) {
    if (isValidRoom.status === 'available') {
      const { images, description } = req.body;
      const imageLinks = images.split(',');
      const UpdateRoom = {
        images: imageLinks,
        description
      };
      const { updatedRoom, error } = await roomService.updateRoom(
        roomId,
        UpdateRoom
      );
      if (!error && updatedRoom) {
        return successResponse(
          res,
          200,
          `Room ${updatedRoom.roomNumber} Updated Successfully`,
          updatedRoom
        );
      }
      return confictResponse(
        res,
        400,
        `Error Updating Room ${isValidRoom.roomNumber}`,
        error
      );
    }
    return confictResponse(
      res,
      400,
      `Can Not Update Room ${isValidRoom.roomNumber} It Is Booked Arleady`,
      [
        `Room Number: ${isValidRoom.roomNumber}`,
        `Room Status: ${isValidRoom.status}`,
        `Accomodation: ${isValidRoom.accomodation.name}`
      ]
    );
  }
  return notFoundResponse(res, 'Room Not Found');
};

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  const { isValidRoom } = await roomService.findRoomById(roomId);
  if (!isValidRoom) return notFoundResponse(res, 'Room Not Found');
  if (isValidRoom.status === 'booked') {
    return confictResponse(
      res,
      409,
      `Can Not Delete Room ${isValidRoom.roomNumber}, It is ${isValidRoom.status} Already`,
      [
        `Room Number: ${isValidRoom.roomNumber}`,
        `Room Status: ${isValidRoom.status}`,
        `Accomodation: ${isValidRoom.accomodation.name}`
      ]
    );
  }
  if (isValidRoom && isValidRoom.status === 'available') {
    const { error } = await roomService.deleteRoom(roomId);
    if (error) return ApplicationError.internalServerError(error, res);
    return successResponse(res, 202, 'Room Deleted Successfully');
  }
};

export const bookRoom = async (req, res) => {
  const { tripId, roomId } = req.body;
  const { trip } = await tripService.findTripById(tripId);
  if (!trip) return notFoundResponse(res, `Trip Not Found`);
  if (trip.userId !== req.user.id) {
    return confictResponse(
      res,
      403,
      `You Are Not Allowed To Book A Room On This Trip Request`
    );
  }
  const { isValidRoom, error } = await roomService.findRoomById(roomId);
  if (!isValidRoom) return notFoundResponse(res, `Room Not Found`, error);
  const accomodation = await accomService.getById(trip.accomodationId);
  if (!accomodation) return notFoundResponse(res, `Accomodation Not Found`);
  if (trip.status === 'approved') {
    if (isValidRoom.accomodationId === accomodation.id) {
      if (isValidRoom.status !== 'available') {
        return confictResponse(
          res,
          409,
          `Can Not Book Room ${isValidRoom.roomNumber}, It is ${isValidRoom.status} Already`,
          [
            `Room Number: ${isValidRoom.roomNumber}`,
            `Room Status: ${isValidRoom.status}`,
            `Accomodation: ${isValidRoom.accomodation.name}`
          ]
        );
      }
      if (isValidRoom.status === 'available') {
        const period =
          (trip.dateOfReturn - trip.dateOfTravel) / (1000 * 3600 * 24);
        const booking = {
          tripId,
          accomodationId: trip.accomodationId,
          roomId,
          arrivalDate: trip.dateOfTravel,
          departureDate: trip.dateOfReturn,
          duration: period
        };
        const UpdateRoom = {
          status: 'booked'
        };
        const { createdBooking, newError } = await roomService.createNewBooking(
          booking,
          UpdateRoom
        );
        if (!newError) {
          return createdResponse(
            res,
            'Room Booked Successfully',
            createdBooking
          );
        }
        return confictResponse(
          res,
          400,
          `Can Not Book Room ${isValidRoom.roomNumber}`,
          newError
        );
      }
    } else {
      return confictResponse(
        res,
        409,
        `You Are Not Allowed To Book A Room In Accomodation: ${isValidRoom.accomodation.name}`,
        [
          `Trip To: ${trip.destination} In Accomodation: ${trip.Accomodation.name}`,
          `Room: ${isValidRoom.roomNumber} Is In Accomodation: ${isValidRoom.accomodation.name}`
        ]
      );
    }
  }
  return confictResponse(
    res,
    409,
    `Can Not Book Room ${isValidRoom.roomNumber}, Trip Status Is: ${trip.status}`,
    [`Room Number: ${isValidRoom.roomNumber}`, `Trip Status: ${trip.status}`]
  );
};

export const getAllBookings = async (req, res) => {
  const userRole = await roleService.getUserRole(req.user.id);
  if (userRole === 'Manager' || userRole === 'Travel Administrator') {
    const { bookings, error } = await roomService.getAvailableBookings();
    if (error) return notFoundResponse(res, error);
    if (bookings) {
      return successResponse(
        res,
        200,
        `All Booking In Your Accomodation Retrieved Successfully`,
        bookings
      );
    }
    return ApplicationError.internalServerError(
      `There was a problem Retrieving Available Bookings In The Database`,
      error
    );
  }
  if (userRole === 'Requester') {
    return confictResponse(
      res,
      403,
      `You Are Not Allowed To View Bookings As A ${userRole}`,
      userRole
    );
  }
};

export const roomCheckInOrCheckOut = async (req, res) => {
  const { bookingId } = req.params;
  const { isValidBooking, validationError } = await roomService.findBookingById(
    bookingId
  );
  if (!isValidBooking) {
    return notFoundResponse(res, 'Booking Not Found', validationError);
  }
  const bookingStatus = {
    status: req.body.status
  };
  if (
    isValidBooking.status === 'booked' &&
    bookingStatus.status === 'checkedIn'
  ) {
    const { updatedBooking, error } = await roomService.checkInBooking(
      bookingId,
      bookingStatus
    );
    if (!error && (updatedBooking || updatedBooking !== 'undefined')) {
      return successResponse(
        res,
        200,
        `Room: ${updatedBooking.room.roomNumber} Of Accomodation: ${updatedBooking.bookedIn.name} Located In: ${updatedBooking.bookedIn.location} Is Checked In Successfully`,
        updatedBooking
      );
    }
    return confictResponse(
      res,
      400,
      `There Was A Problem Checking In The Booking`,
      error
    );
  }

  if (
    isValidBooking.status === 'checkedIn' &&
    bookingStatus.status === 'checkedOut'
  ) {
    const roomStatus = {
      status: 'available'
    };
    const { updatedBooking, error } = await roomService.checkOutBooking(
      bookingId,
      bookingStatus,
      roomStatus,
      isValidBooking.roomId
    );
    if (!error && (updatedBooking || updatedBooking !== 'undefined')) {
      return successResponse(
        res,
        200,
        `Room: ${updatedBooking.room.roomNumber} Of Accomodation: ${updatedBooking.bookedIn.name} Is Checked Out Successfully`,
        updatedBooking
      );
    }
    return confictResponse(
      res,
      400,
      `There Was A Problem Checking Out The Booking`,
      error
    );
  }

  if (
    (isValidBooking.status === 'checkedIn' &&
      bookingStatus.status === 'checkedIn') ||
    (isValidBooking.status === 'checkedOut' &&
      bookingStatus.status === 'checkedOut') ||
    (isValidBooking.status === 'booked' &&
      bookingStatus.status === 'checkedOut') ||
    (isValidBooking.status === 'checkedOut' &&
      bookingStatus.status === 'checkedIn')
  ) {
    return confictResponse(
      res,
      400,
      `Room: ${isValidBooking.room.roomNumber} Of Accomodation: ${isValidBooking.bookedIn.name} Is ${isValidBooking.status} Arleady`,
      [
        `Room Number: ${isValidBooking.room.roomNumber}`,
        `Room Status: ${isValidBooking.status}`,
        `Accomodation: ${isValidBooking.bookedIn.name}`
      ]
    );
  }
};

export const removeRoomBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { isValidBooking } = await roomService.findBookingById(bookingId);
  if (!isValidBooking) return notFoundResponse(res, 'Booking Not Found');
  const { trip } = await tripService.findTripById(isValidBooking.tripId);
  if (trip.userId !== req.user.id) {
    return confictResponse(
      res,
      403,
      `You Are Not Allowed To Remove This Booking`
    );
  }
  if (isValidBooking.status === 'checkedIn') {
    return confictResponse(
      res,
      400,
      `Room: ${isValidBooking.room.roomNumber} Of Accomodation: ${isValidBooking.bookedIn.name} Is ${isValidBooking.status} Arleady`,
      [
        `Room Number: ${isValidBooking.room.roomNumber}`,
        `Room Status: ${isValidBooking.status}`,
        `Accomodation: ${isValidBooking.bookedIn.name}`
      ]
    );
  }
  const roomStatus = {
    status: 'available'
  };
  const { clearRoom, error } = await roomService.deleteBooking(
    bookingId,
    roomStatus,
    isValidBooking.roomId
  );
  if (!clearRoom[0] === 1) {
    return ApplicationError.internalServerError(error, res);
  }
  return successResponse(res, 202, 'Booking Deleted Successfully');
};

export const deleteRoomBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { isValidBooking } = await roomService.findBookingById(bookingId);
  if (!isValidBooking) return notFoundResponse(res, 'Booking Not Found');
  if (isValidBooking.status === 'checkedIn') {
    return confictResponse(
      res,
      400,
      `Room: ${isValidBooking.room.roomNumber} Of Accomodation: ${isValidBooking.bookedIn.name} Is ${isValidBooking.status} Arleady`,
      [
        `Room Number: ${isValidBooking.room.roomNumber}`,
        `Room Status: ${isValidBooking.status}`,
        `Accomodation: ${isValidBooking.bookedIn.name}`
      ]
    );
  }
  const roomStatus = {
    status: 'available'
  };
  const { clearRoom, error } = await roomService.deleteBooking(
    bookingId,
    roomStatus,
    isValidBooking.roomId
  );
  if (!clearRoom[0] === 1) {
    return ApplicationError.internalServerError(error, res);
  }
  return successResponse(res, 202, 'Booking Deleted Successfully');
};
