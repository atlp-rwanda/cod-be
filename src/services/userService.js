import models from '../database/models';

const { Users } = models;
const addUser = async (newUser)=>{
  const user = await  Users.create(newUser);
  return user;
}
const findByEmail = async (email) => {
  const user = await Users.findOne({ where: { email: `${email}` } });
  if(user){
    delete user.dataValues.password;
  }
  return user;
}

const findByEmailToken = async (emailToken) => {
  const user = await Users.findOne({ where: { email_token: emailToken } });
  if(user){
    delete user.dataValues.password;
  }
  return user;
};
export { addUser, findByEmail, findByEmailToken };
