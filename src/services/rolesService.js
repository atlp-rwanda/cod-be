import models from '../database/models';

const { Users, Roles } = models;
const isSuperAdmin = async (email, userId) => {
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
const isAdmin = async (email, userId) => {
  const user = await Users.findOne({
    where: { email: `${email}`, id: userId }
  });
  if (user) {
    if (user.dataValues.roleId === 2) {
      return true;
    }
    return false;
  }
  return false;
};
const getUserRole = async (userId) => {
  const user = await Users.findOne({
    where: {
      id: userId
    }
  });
  const userRoleName = await Roles.findOne({
    where: { id: user.dataValues.roleId }
  });
  return userRoleName.dataValues.roleName;
};
const findByName = async (roleName) => {
  const role = await Roles.findOne({ where: { roleName } });
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
const isManager = async (email, userId) => {
  const user = await Users.findOne({
    where: { email: `${email}`, id: userId }
  });
  if (!user) return false;
  if (user.dataValues.roleId === 3) return true;
  return false;
};
export {
  isSuperAdmin,
  findByName,
  updateUserRole,
  isAdmin,
  getUserRole,
  isManager
};
