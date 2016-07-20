const readline = require('readline');
const fs = require('fs');
const path = require('path');
const fileName = '_6ec67df2804ff4b58ab21c12edcb21f8_Median.txt';
const pathName = path.join('./', fileName);
const median = require('./median');
const Heap = median.Heap;
var medianSum = 0;
var heapLow = new Heap(false);
var heapHigh = new Heap(true);
const rl = readline.createInterface({
    input: fs.createReadStream(pathName)
});

rl.on('line', function (line) {
    const num = parseInt(line, 10);
    if (num > 0) {
        medianSum = medianSum + median.getMedian(heapLow, heapHigh, num);
    }
});

rl.on('close', function () {
    console.log('Sum of medians is ' + medianSum + ' on ' + heapLow.heap.length + ',' + heapHigh.heap.length + ' integers.');
    console.log('Sum of medians mod 10000 is ' + (medianSum % 10000));
});