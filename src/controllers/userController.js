import * as validations from '../validations/index';
import  * as userService from '../services/userService';
import bcrypt from 'bcrypt';
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
                password:requestBody.password,
            };
            var user=await userService.addUser(userData);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            jwt.sign({email:user.email,id:user.id},jwtToken,{ expiresIn: '1h' }, (err, token) => {
                if (err) {
                response.status(500).json({"errors": "An error occured failed"});
                }
                else {
                response.status(201).json({'token':token,message:'User created'});}
            });      
       } else {
        response.status(500).json({error:true,errors:validate.error.details[0].context.label});
       }
    } catch (error) {
        response.status(500).json("Error,please try again!");    
    }
}
export {registerNew}
