/**
 * @description Global error handling middleware
 * @param {*} fn asynchronous function
 * @returns{function} A promise that resolves if the function runs successfully or catch the error and pass it to error hander
 */
const errorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default errorHandler;
