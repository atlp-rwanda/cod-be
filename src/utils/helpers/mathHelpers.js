/* eslint-disable import/prefer-default-export */
const round = (num) => {
  const m = Number((Math.abs(num) * 10).toPrecision(15));
  return (Math.round(m) / 10) * Math.sign(num);
};
const average = (a) => {
  const sum = a.reduce((b, c) => b + c, 0);
  return round(sum / a.length);
};
export { average };
