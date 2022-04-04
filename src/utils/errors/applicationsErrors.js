/* eslint-disable require-jsdoc */

const internalServerError = async (message, res) => {
  res.status(500).json({ 'Error:': message, status: 500 });
};
const validationError = async (message, res) => {
  res.status(400).json({ Error: message, status: 400 });
};

const notFoundError = async (message, res) => {
  res.status(404).json({ Error: message, status: 404 });
};
const notAcceptableError = async (message, res) => {
  res.status(406).json({ Error: message, status: 406 });
};
const AuthorizationError = async (message, res) => {
  res.status(401).json({ Error: message, status: 401 });
};
const badRequestError = async (message, res) => {
  res.status(400).json({ Error: message, status: 400 });
};

export {
  internalServerError,
  validationError,
  notFoundError,
  notAcceptableError,
  AuthorizationError,
  badRequestError
};
