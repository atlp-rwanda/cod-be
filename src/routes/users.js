import express from "express";
import  * as userControl from '../controllers/userController';

const userRouter=express.Router();
userRouter.post('/user/register',(req,res,next)=>{
    try {
        userControl.default.registerNew(req.body,res);
    } catch (error) {
        res.status(500).json("An error has occured, try again!");
        next(error);        
    }  
});
export default userRouter;
