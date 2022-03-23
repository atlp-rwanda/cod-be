/* eslint-disable require-jsdoc */

const internalServerError=async(message,res)=>{
    res.status(500).json({'Error:': message});
}
const validationError=async(message,res)=>{
    res.status(400).json({Error:message});
}

const notFoundError = async ( message, res ) => {
    res.status(404).json({Error:message});
}

export { internalServerError, validationError, notFoundError};
