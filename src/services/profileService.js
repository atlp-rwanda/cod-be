/* eslint-disable consistent-return */
import models from '../database/models';

const { Profile } = models;
const addProfile = async (newProfile) => {
  const profile = await Profile.create(newProfile);
  return profile;
};
const findUserProfile = async (userId) => {
  const profile = await Profile.findOne({ where: { userId: `${userId}` } });
  if (profile) {
    return profile;
  }
};
const updateProfile = async (userId, data) => {
  const profile = await Profile.findOne({ where: { userId: `${userId}` } });
  profile.gender = data.gender;
  profile.language = data.language;
  profile.currency = data.currency;
  profile.location = data.location;
  profile.departement = data.departement;
  profile.manager = data.manager;
  profile.birthdate = data.birthdate;

  await profile.save();

  return profile;
};
export { addProfile, findUserProfile, updateProfile };
