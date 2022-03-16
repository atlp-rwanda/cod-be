/* eslint-disable require-jsdoc */

const emailAlreadyExists=async(message,res)=>{
    res.status(409).json({'Error:': message});
}

export {emailAlreadyExists};