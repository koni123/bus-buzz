// helper for finding same string from all arrays given as a parameter
// could also return an array of string weighing by cost or similar
// but since all "cost" the same we don't care if we take green or yellow line as long as it takes us where we want to
export const findSimilarValuesInArrays = arrayOfArrays => {
  let found = '';
  for (const arr of arrayOfArrays) {
    for (const color of arr) {
      if (arrayOfArrays.filter(a => a.includes(color)).length === arrayOfArrays.length) {
        found = color;
      }
    }
  }
  return found;
};
