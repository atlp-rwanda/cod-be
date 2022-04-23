export const changeToArray = str =>{
    return Array.isArray(str)
    ? str
    : str.split(',');
}