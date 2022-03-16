import models from '../database/models';

const { Users } = models;
const addUser=async (newUser)=>{
  const user=await  Users.create(newUser);
  return user;
}
const findByEmail=async(email)=>{
  const user = await Users.findOne({ where: { email: `${email}` } });
  return user;
}
export {addUser,findByEmail};