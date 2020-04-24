// helper for finding ONE possible route color within arrays of line colors
export const findSimilarValuesInArrays = arrayOfArrays => {
  let found = '';
  console.log(arrayOfArrays);
  for (const arr of arrayOfArrays) {
    for (const color of arr) {
      // if found in all, does not matter which color - lines all "cost" the same amount
      if (arrayOfArrays.filter(a => a.includes(color)).length === arrayOfArrays.length) {
        found = color;
      }
    }
  }
  console.log(found);
  return found;
};
