/* eslint-disable require-jsdoc */

const isNotAuthenticated = async (message, res) => {
  res.status(401).json({ Error: message });
};
const isNotAuthorized = (message, res) => {
  res.status(402).json({ Error: message });
};
export { isNotAuthenticated, isNotAuthorized };
