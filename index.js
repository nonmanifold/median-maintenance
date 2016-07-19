const readline = require('readline');
const fs = require('fs');
const path = require('path');
const fileName = '_6ec67df2804ff4b58ab21c12edcb21f8_Median.txt';
const pathName = path.join('./', fileName);
const median = require('./median');
var medianSum = 0;
var count = 0;
const rl = readline.createInterface({
    input: fs.createReadStream(pathName)
});

rl.on('line', function (line) {
    medianSum += median.parseLine(nodes, line);
    count++;
});

rl.on('close', function () {
    console.log('Sum of medians is ' + medianSum + ' on ' + count + ' integers.');
    console.log('Sum of medians mod 10000 is ' + (medianSum % 10000));

});