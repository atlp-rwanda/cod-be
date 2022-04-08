import models from '../database/models';

const { Users } = models;
const addUser = async (newUser) => {
  const user = await Users.create(newUser);
  return user;
};
const findById=async(id)=>{
  const user = await Users.findOne({ where: { id: `${id}` } });
  if(user){
    delete user.dataValues.password;
  }
  return user;
}
const findByEmail = async (email) => {
  const user = await Users.findOne({ where: { email: `${email}` } });
  if (user) {
    delete user.dataValues.password;
  }
  return user;
};

const findByEmailToken = async (emailToken) => {
  const user = await Users.findOne({ where: { email_token: emailToken } });
  if (user) {
    delete user.dataValues.password;
  }
  return user;
};
const updateOrCreate = async (model, where, newItem) => {
  // First try to find the refresh token
  const foundItem = await model.findOne({ where });
  if (!foundItem) {
    // If refresh token not found, create a new one
    const item = await model.create(newItem);
    return { item, created: true };
  }
  // If Found, update it
  const item = await model.update(newItem, { where });
  return { item, created: false };
};
const findByResetToken = async (emailToken) => {
  const user = await Users.findOne({ where: { email_token: emailToken } });
  return user;
};
const fetchAll = async()=>{
  const all=await Users.findAll({
    include: [
      {
        model: models.Roles,as:'rolename',
        attributes: ['roleName','description',]
      },
    ],
    attributes: { exclude: ['roleId','password','email_token','googleId','facebookId']},
  });
  
  return all;
}
export {
  addUser,
  findByEmail,
  findByEmailToken,
  updateOrCreate,
  findByResetToken,findById,
  fetchAll
};
