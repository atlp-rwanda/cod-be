/* eslint-disable no-unused-vars */
import express from 'express';
import  * as userControl from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/user/register', ( req, res, next ) => {
    try {
        const appUrl = req.headers.host;
        userControl.default.registerNew( req.body, res, appUrl);
    } catch (error) {
        res.status(500).json({'Error Message:': 'An Error Has Occured, Try Again!', Error: error });
        next(error);        
    }  
});

userRouter.get('/verify-user', async (req, res, next) => {
    try {
        const emailToken = req.query.token;
        userControl.default.verifyUser(emailToken, res);
    } catch (error) {
        res.status(500).json({'Error:': error });
        next(error);        
    }  
});

export default userRouter;
