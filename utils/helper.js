function generateCombinations(items, length) {
  const res = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      for (let k = i + 1; k < items.length; k++) {
        for (let x = 0; x < length; x++) {
          if (!items[k][x]) {
            continue;
          }
          res.push([items[i][j], items[k][x]]);
        }
      }
    }
  }
  return res;
}

module.exports = {
  generateCombinations,
};
