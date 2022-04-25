import Joi from 'joi';

const approveRequestSchema = Joi.object().keys({
  status: Joi.string()
    .valid('approved', 'rejected', 'pending')
    .required()
    .label('Status Of Trip Request')
});

export default approveRequestSchema;
