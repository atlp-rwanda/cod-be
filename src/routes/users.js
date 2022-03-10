/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import { User } from '../database/models';

const officeRoute = express.Router();

officeRoute.post('/users/new', async (req, res) => {
  const {
    fName,
    lName,
    email,
    password
  } = req.body;
  try {
    const user = await User.create({
      fName,
      lName,
      email,
      password
    });
    console.log(user);
    return res.json(user);
  } catch (error) {
    console.log({ Error: error });
    return res.status(500).json(error);
  }
});

officeRoute.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    return res.json(users);
  } catch (error) {
    console.log({ Error: error });
    return res.status(500).json(error);
  }
});

export default officeRoute;
