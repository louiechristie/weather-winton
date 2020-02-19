/**
 * Command line utility to
 *
 * Calculate proportions for temperature ranges based on historical data
 *
 * To run:
 *
 * node daily.js
 */

fs = require('fs');
fs = require('fs');

const callback = (err, data) => {
  const temperatures = [];

  if (err) {
    return console.log(err);
  }

  const lines = data.trim().split(/\n+/);

  console.log(`lines: ${lines}`);

  let words = [];

  for (let i = 0; i < lines.length; i += 1) {
    words = lines[i].trim().split(/\s+/);
    console.log(`words: ${words}`);

    for (let j = 2; j < words.length; j++) {
      const temperature = parseInt(words[j], 10) / 10;
      if (temperature !== -99.9) {
        temperatures.push(temperature);
      }
    }
  }

  const sorted = temperatures.sort(function(a, b) {
    return a - b;
  });

  const sortedSting = JSON.stringify(sorted, null, 2);

  console.log(`sortedString: ${sortedSting}`);

  let output = {};

  // output = {
  //   freezingNumber: sorted.filter(temperature => {
  //     return temperature <= 4;
  //   }).length,
  //   coldNumber: sorted.filter(temperature => {
  //     return temperature > 4 && temperature < 16;
  //   }).length,
  //   warmNumber: sorted.filter(temperature => {
  //     return temperature > 16 && temperature <= 24;
  //   }).length,
  //   hotNumber: sorted.filter(temperature => {
  //     return temperature > 24;
  //   }).length,
  //   min: sorted[0],
  //   max: sorted[sorted.length - 1],
  // };

  for (let k = 0; k < sorted.length; k++) {
    const key = Math.round(sorted[k]);
    output[key] = output[key] ? output[key] + 1 : 1;
  }

  const outputString = JSON.stringify(output, null, 2);

  console.log(`outputString: ${outputString}`);

  return output;
};

fs.readFile('./cetdl1772on.dat', 'utf8', callback);
