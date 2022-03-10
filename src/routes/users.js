/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import  * as userControl from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/user/register', ( req, res, next ) => {
    try {
        userControl.registerNew( req.body, res,next);
    } catch (error) {
        res.status(500).json({'Error Message:': 'An Error Has Occured, Try Again!', Error: error });
        next(error);        
    }  
});
userRouter.post('/user/login', userControl.login);
userRouter.post('/user/refresh', userControl.refreshToken);

export default userRouter;
