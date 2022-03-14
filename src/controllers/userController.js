import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as validations from '../validations';
import  * as userService from '../services/userService';

dotenv.config();
const jwtToken=process.env.JWT_KEY;
const registerNew=async (requestBody,response)=> {
    try {
        const validate=validations.userSchema.registerSchema.validate(requestBody);
        if (!validate.error) {
            const findIfExist=await userService.findByEmail(requestBody.email);
            if (findIfExist!=null) {
                return response.status(409).json({'email':'Email already exists'});
            }  
            const userData={
                firstname:requestBody.firstname,
                lastname:requestBody.lastname,
                email:requestBody.email,
                password:requestBody.password,
            };
            const user=await userService.addUser(userData);
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
        response.status(400).json({error:true,errors:validate.error.details[0].context.label});
       }
    } catch (error) {
        console.log(error);
        response.status(500).json("Error,please try again!");    
    }
}
export default {registerNew}
