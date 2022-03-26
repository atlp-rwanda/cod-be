/* eslint-disable require-jsdoc */

const isNotAuthenticated = async (message, res) => {
  res.status(401).json({ Error: message, status: 401 });
};
const isNotAuthorized = (message, res) => {
  res.status(403).json({ Error: message, status: 403 });
};
export { isNotAuthenticated, isNotAuthorized };
