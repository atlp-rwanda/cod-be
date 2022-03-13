import express from "express";
import  * as Role from '../controllers/roleController';
import * as auth from '../middlewares/auth';
const roleRouter=express.Router();
roleRouter.get('/v1/users/assignRole',auth.isAdmin,(req,res,next)=>{
    try {
        Role.getRoleId(req,res);
    } catch (error) {
        next(error);
        res.status(500).json("An error has occured, try again!");        
    }  
});
export default roleRouter;
