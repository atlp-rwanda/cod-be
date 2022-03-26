/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */

const isNotFound = async (message, res) => {
  res.status(404).json({ Error: message, status: 404 });
};

export { isNotFound };
