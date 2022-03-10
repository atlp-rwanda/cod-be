import Joi from 'joi';
const registerSchema=Joi.object().keys({
    firstname:Joi.string().required().label('Firstname is required'),
    lastname:Joi.string().required().label('Lastname is required'),
    email:Joi.string().email().lowercase().required().label('Email is required,lowercase and valid'),
    password:Joi.string().min(8).alphanum().required().label('Password should be atleast 8 characters long with letters and numbers combined'),
})
export {registerSchema}
