/**
 * @param {*} schema
 * @returns{object} allows next() if the request body is valid otherwise returns an error
 */
export default function paramsValidate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).send({
        status: 400,
        data: { message: error.details[0].message.replace(/[/"]+/g, ''), error }
      });
    }
    next();
  };
}
