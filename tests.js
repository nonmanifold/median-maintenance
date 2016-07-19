const assert = require('assert');
const median = require('./median');
const Heap = median.Heap;
const getMedian = median.getMedian;
const getMidx = median.getMidx;

const h = new Heap(true);
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    h.put(i);
});
assert.deepEqual([4, 4, 4, 8, 9, 11, 12, 9, 13], h.heap);
assert.deepEqual(4, h.extractRoot());
assert.deepEqual([4, 8, 4, 9, 9, 11, 12, 13], h.heap);

const hLow = new Heap(false);
const hHigh = new Heap(true);
const medians = [];
var medianSum = 0;
[9, 9, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function (i) {
    var median = getMedian(hLow, hHigh, i);
    medians.push(median);
    medianSum = medianSum + median;
});
assert.deepEqual([9, 9, 9, 7, 7, 3, 4, 4, 5, 5, 6, 6], medians);
assert.equal((9 + 9 + 9 + 7 + 7 + 3 + 4 + 4 + 5 + 5 + 6 + 6), medianSum);
console.log('Pass');
