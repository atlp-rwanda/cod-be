/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../database/models';

const userRoute = express.Router();

userRoute.post('/new', async (req, res) => {
  const { fName, lName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      fName,
      lName,
      email,
      password: hashedPassword
    });
    return res.send(201, 'User Registered');
  } catch (error) {
    console.log({ Error: error });
    return res.status(500).json(error);
  }
});

export default userRoute;
