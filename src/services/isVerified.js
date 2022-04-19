/* eslint-disable no-console */
/* eslint-disable no-else-return */
import dotenv from 'dotenv';
import { Users } from '../database/models';

dotenv.config();
const isUserVerified = async (email) => {
  const user = await Users.findOne({ where: { email } });
  console.log(user.isVerified);
};

export default isUserVerified;
