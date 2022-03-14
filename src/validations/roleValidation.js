import Joi from 'joi';

const assignRole=Joi.object().keys({
    rolename:Joi.string().required().label('Role name is required'),
})
export {assignRole}
