import envKeys from "../config/envConfig";

const validateVariables =() => {
    let checkPass = 0;
    const envVariables=envKeys;
    const objKeys = Object.keys(envVariables);
    objKeys.forEach((key) => {
        if (!envVariables[key]) {
            console.log(`\nSet a value for ${key} in .env file`);
            checkPass+=1;
        }
    });
    if (checkPass > 0){
        return false;
    } 
    return true;
};
export default validateVariables;

