/* eslint-disable import/prefer-default-export */
/* eslint-disable require-jsdoc */
import moment from 'moment';

function formatMessage(room, message, firstname, lastname) {
  return {
    room,
    message,
    firstname,
    lastname,
    createdAt: moment().format('h:mm a')
  };
}

export { formatMessage };
