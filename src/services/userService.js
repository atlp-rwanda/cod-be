import models from '../database/models';
const { User } = models;
const addUser=async (newUser)=>{
  const user=await  User.create(newUser);
}
const findByEmail=async(email)=>{
  const user = await User.findOne({ where: { email: `${email}` } });
  return user;
}
export {addUser,findByEmail};
