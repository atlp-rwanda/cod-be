import Joi from 'joi';

const imageSchema = Joi.string().min(3).required().label('Images of the Room');

export const roomSchema = Joi.object().keys({
  accomodationId: Joi.number()
    .integer()
    .required()
    .min(1)
    .label('Accomodation Id'),
  roomNumber: Joi.number().integer().required().min(1).label('Room Number'),
  images: Joi.alternatives()
    .try(imageSchema, Joi.array().min(2).unique().items(imageSchema))
    .required()
    .messages({
      'array.unique': 'The Image Array Contains Duplicate Links',
      'any.required': 'Image of Room'
    }),
  description: Joi.string().required().min(5).max(500).label('Description')
});

export const updatedRoomSchema = Joi.object().keys({
  images: Joi.alternatives()
    .try(imageSchema, Joi.array().min(2).unique().items(imageSchema))
    .required()
    .messages({
      'array.unique': 'The Image Array Contains Duplicate Links',
      'any.required': 'Image of Room'
    }),
  description: Joi.string().required().min(5).max(500).label('Description')
});

export const bookingSchema = Joi.object().keys({
  tripId: Joi.string().required().min(5).label('Valid Trip Id'),
  roomId: Joi.string().required().min(5).label('Valid Room Id')
});

export const checkInorCheckoutSchema = Joi.object().keys({
  status: Joi.string()
    .valid('checkedIn', 'checkedOut')
    .required()
    .label('Status Of The Booking Request')
});
