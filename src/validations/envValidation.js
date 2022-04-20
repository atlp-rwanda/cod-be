/* eslint-disable no-console */
import * as configs from '../config';

const envKey = configs.default.envKeys;
const validateVariables = () => {
  let checkPass = 0;
  const envVariables = envKey;
  const objKeys = Object.keys(envVariables);
  objKeys.forEach((key) => {
    if (!envVariables[key]) {
      console.log(`\nSet a value for ${key} in .env file`);
      checkPass += 1;
    }
  });
  if (checkPass > 0) {
    return false;
  }
  return true;
};
export default validateVariables;
