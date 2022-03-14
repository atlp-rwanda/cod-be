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
const isAdmin=async(email,id)=>{
  try {
    const user = await Users.findOne({ where: { email: `${email}`,id:`${id}` } });
    if (user!=null && user.roleId===1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
export {addUser,findByEmail,isAdmin};
