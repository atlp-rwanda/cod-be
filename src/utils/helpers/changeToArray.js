/* eslint-disable valid-jsdoc */
/**
 * @param {*} str a string or array
 * @returns Parsed array
 */
export default function changeToArray(str) {
  return Array.isArray(str) ? str : str.split(',');
}
