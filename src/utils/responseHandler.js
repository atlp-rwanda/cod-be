const notFoundResponse = async (res, message, data = null) =>
  res.status(404).json({ status: 404, data: { message, data } });

const successResponse = async (res, code, message, data = null) =>
  res.status(code).json({ status: code, data: { message, data } });

const createdResponse = async (res, message, data = null) =>
  res.status(201).json({ status: 201, data: { message, data } });

const confictResponse = async (res, statusCode, message, dataDetails) =>
  res
    .status(statusCode)
    .send({ status: statusCode, data: { message, dataDetails } });

export { notFoundResponse, successResponse, createdResponse, confictResponse };
