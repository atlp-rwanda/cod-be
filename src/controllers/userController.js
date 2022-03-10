import * as validations from '../validations/index';
import  * as userService from '../services/userService';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtToken=process.env.JWT_KEY || 'newUser';
const registerNew=async (requestBody,response)=> {
    try {
        const validate=validations.userSchema.registerSchema.validate(requestBody);
        if (!validate.error) {
            var findIfExist=await userService.findByEmail(requestBody.email);
            if (findIfExist!=null) {
                return response.status(500).json("Email already exists");
            }  
            var userData={
                firstname:requestBody.firstname,
                lastname:requestBody.lastname,
                email:requestBody.email,
                password:md5(requestBody.password),
            };
            await userService.addUser(userData);
            jwt.sign({email: userData.email},jwtToken,{ expiresIn: '1h' }, (err, token) => {
                if (err) {
                response.status(500).json({"errors": "An error occured failed"});
                }
                else {
                response.status(201).json({'token':token,message:'User created'});
            }
        });      
       } else {
        response.status(500).json({error:true,errors:validate.error.details[0].context.label});}
    } catch (error) {
        console.log(error);
        response.status(500).json("Error,please try again!");    
    }
}
export {registerNew}
