/* eslint-disable no-plusplus */
const getRatingArray = (array) => {
  // function to filter the array of rating query to get only ratings
  const newArray = array.map((a) => a.serviceRating);
  return newArray;
};

const classifyRating = (ratings) => {
  const serviceRating = getRatingArray(ratings);
  const count = {};
  for (let i = 0; i < serviceRating.length; i++) {
    if (count[serviceRating[i]]) {
      count[serviceRating[i]] += 1;
    } else {
      count[serviceRating[i]] = 1;
    }
  }
  return count;
};
export { getRatingArray, classifyRating };
