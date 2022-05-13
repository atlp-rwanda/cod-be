import models from '../database/models';

const { Accomodation, Rooms, Bookings } = models;

export const getAvailableRooms = async (status) => {
  const rooms = await Rooms.findAll({
    where: { status },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (rooms.length === 0) {
    const error = 'No Available Rooms In Your Accomodation';
    return { error };
  }
  return { rooms };
};

export const getAvailableBookings = async () => {
  const bookings = await Bookings.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  if (bookings.length === 0) {
    const error = 'No Available Bookings In Your Accomodation';
    return { error };
  }
  return { bookings };
};

export const createNewRoom = async (newRoom) => {
  const exitistingRoom = await Rooms.findAll({
    where: {
      accomodationId: newRoom.accomodationId,
      roomNumber: newRoom.roomNumber
    }
  });
  if (exitistingRoom.length !== 0) {
    const error = 'Room Is Already Registered In Your Accomodation';
    return { error };
  }
  await Rooms.create(newRoom);
  const createdRoom = await Rooms.findOne({
    where: {
      accomodationId: newRoom.accomodationId,
      roomNumber: newRoom.roomNumber
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }).catch((err) => {
    const error = err;
    return { error };
  });
  return { createdRoom };
};

export const updateRoom = async (roomId, UpdateRoom) => {
  try {
    await Rooms.update(UpdateRoom, {
      where: {
        id: roomId
      }
    });
    const updatedRoom = await Rooms.findOne({
      where: { id: roomId },
      include: [
        {
          model: Accomodation,
          as: 'accomodation',
          attributes: ['name', 'location']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return { updatedRoom };
  } catch (error) {
    return { error };
  }
};

export const findRoomById = async (roomId) => {
  try {
    const isValidRoom = await Rooms.findOne({
      where: { id: roomId },
      include: [
        {
          model: Accomodation,
          as: 'accomodation',
          attributes: ['name']
        }
      ]
    });
    return { isValidRoom };
  } catch (error) {
    return { error };
  }
};

export const deleteRoom = async (roomId) => {
  try {
    return await Rooms.destroy({
      where: { id: roomId }
    });
  } catch (error) {
    return { error };
  }
};

export const findBookingById = async (bookingId) => {
  try {
    const isValidBooking = await Bookings.findOne({
      where: { id: bookingId },
      include: [
        {
          model: Accomodation,
          as: 'bookedIn',
          attributes: ['name']
        },
        {
          model: Rooms,
          as: 'room',
          attributes: ['roomNumber']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return { isValidBooking };
  } catch (error) {
    const validationError = error;
    return { validationError };
  }
};

export const createNewBooking = async (booking, UpdateRoom) => {
  try {
    await Bookings.create(booking);
    await Rooms.update(UpdateRoom, {
      where: {
        id: booking.roomId
      }
    });
    const createdBooking = await Bookings.findOne({
      where: {
        accomodationId: booking.accomodationId,
        tripId: booking.tripId
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return { createdBooking };
  } catch (error) {
    const newError = error;
    return { newError };
  }
};

export const checkInBooking = async (bookingId, bookingStatus) => {
  try {
    await Bookings.update(bookingStatus, {
      where: {
        id: bookingId
      }
    });
    const updatedBooking = await Bookings.findOne({
      where: { id: bookingId },
      include: [
        {
          model: Accomodation,
          as: 'bookedIn',
          attributes: ['name', 'location']
        },
        {
          model: Rooms,
          as: 'room',
          attributes: ['roomNumber']
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return { updatedBooking };
  } catch (error) {
    return { error };
  }
};

export const checkOutBooking = async (
  bookingId,
  bookingStatus,
  roomStatus,
  roomId
) => {
  await Bookings.update(bookingStatus, {
    where: {
      id: bookingId
    }
  });
  await Rooms.update(roomStatus, {
    where: {
      id: roomId
    }
  });
  const updatedBooking = await Bookings.findOne({
    where: { id: bookingId },
    include: [
      {
        model: Accomodation,
        as: 'bookedIn',
        attributes: ['name', 'location']
      },
      {
        model: Rooms,
        as: 'room',
        attributes: ['roomNumber']
      }
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  return { updatedBooking };
};

export const deleteBooking = async (bookingId, roomStatus, roomId) => {
  try {
    await Bookings.destroy({
      where: { id: bookingId }
    });
    const clearRoom = await Rooms.update(roomStatus, {
      where: {
        id: roomId
      }
    });
    return { clearRoom };
  } catch (error) {
    return { error };
  }
};
