/* eslint-disable require-jsdoc */
/* eslint-disable import/prefer-default-export */
const emailAlreadyExists=async(message,res)=>{
    res.status(409).json({'Error:': message});
}

export {emailAlreadyExists};