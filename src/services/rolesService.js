import models from '../database/models';

const { Users, Roles } = models;
const isAdmin = async (email, userId) => {
  const user = await Users.findOne({
    where: { email: `${email}`, id: userId }
  });
  if (user) {
    if (user.dataValues.roleId === 1) {
      return true;
    }
    return false;
  }
  return false;
};
const findByName = async (rolename) => {
  const role = await Roles.findOne({ where: { roleName: `${rolename}` } });
  return role;
};
const updateUserRole = async (userId, role) => {
  const user = await Users.findOne({ where: { id: `${userId}` } });
  if (user) {
    user.roleId = role;
    user.save();
    return true;
  }
  return false;
};
export { isAdmin, findByName, updateUserRole };
