function generateCombinations(items, length) {
  const res = []
  console.log('Generating combinations with length:', items);
  for (let i = 0; i < items.length; i++) { // [[5], [3, 4], [1, 2]]
    console.log("items-", items[i]);
    for(let j = 0; j < items[i].length; j++) { // [5]
      const tmp = []
      console.log('j-', items[i][j]);
      for(let x = 0; x < items[i + 1]?.length; x++) {
        console.log('x-', items[i + 1][x]);
        if (items[i][j][0] === items[i + 1][x][0]) {
          continue; // Skip if all indices are the same
        }
        tmp.push(items[i + 1][x]);
      }
    }
  }
}

module.exports = {
  generateCombinations,
};
