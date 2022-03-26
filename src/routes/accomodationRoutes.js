import express from "express";
import * as validate from '../middlewares/validateInputs';
import * as Accomodation from '../controllers/accomodationController';
import isLoggedIn from "../middlewares/authenticate"
import { adminUser} from '../middlewares/authorize';

const accomodationRouter=express.Router();
accomodationRouter.post('/v1/accommodations/register',isLoggedIn, adminUser, validate.addAccomodation,Accomodation.newEntry);

accomodationRouter.get('/v1/accommodations',isLoggedIn, adminUser, Accomodation.getAll);

accomodationRouter.get('/v1/accommodations/:Id',isLoggedIn, adminUser,Accomodation.getById);

accomodationRouter.patch('/v1/accommodations/update/:Id', isLoggedIn, adminUser,validate.updateAccomodation,Accomodation.doUpdate);

accomodationRouter.delete('/v1/accommodations/remove/:Id',isLoggedIn, adminUser,Accomodation.doDelete);

export default accomodationRouter;
