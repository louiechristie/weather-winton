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

  for (let i = 0; i < lines.length; i++) {
    words = lines[i].trim().split(/\s+/);
    console.log(`words: ${words}`);

    for (let j = 2; j < words.length; j++) {
      const temperature = parseInt(words[j], 10) / 10;
      if (temperature !== -999) {
        temperatures.push(temperature);
      }
    }
  }

  const sorted = temperatures.sort();

  const sortedSting = JSON.stringify(sorted, null, 2);

  console.log(`sortedString: ${sortedSting}`);

  const output = {
    freezingNumber: sorted.filter(temperature => {
      return temperature <= 4;
    }).length,
    coldNumber: sorted.filter(temperature => {
      return temperature > 4 && temperature < 16;
    }).length,
    warmNumber: sorted.filter(temperature => {
      return temperature > 16 && temperature <= 24;
    }).length,
    hotNumber: sorted.filter(temperature => {
      return temperature > 24;
    }).length,
  };

  const outputString = JSON.stringify(output, null, 2);

  console.log(`outputString: ${outputString}`);

  return output;
};

fs.readFile('./cetdl1772on.dat', 'utf8', callback);
