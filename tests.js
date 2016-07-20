const assert = require('assert');
const median = require('./median');
const Heap = median.Heap;
const getMedian = median.getMedian;

const hMin = new Heap(true);
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    hMin.put(i);
});
assert.deepEqual([4, 4, 4, 8, 9, 11, 12, 9, 13], hMin.heap);
assert.deepEqual(4, hMin.extractRoot());
assert.deepEqual([4, 8, 4, 9, 9, 11, 12, 13], hMin.heap);

const hMinSerial = new Heap(true);
[0, 1, 2, 3, 4, 5, 6, 7].forEach(function (i) {
    hMinSerial.put(i);
});
const mins = [];
[0, 1, 2, 3, 4, 5, 6, 7].forEach(function (i) {
    mins.push(hMinSerial.extractRoot());
});
assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7], mins);

const hMaxSerial = new Heap(false);
[0, 1, 2, 3, 4, 5, 6, 7].forEach(function (i) {
    hMaxSerial.put(i);
});
const maxs = [];
[0, 1, 2, 3, 4, 5, 6, 7].forEach(function (i) {
    maxs.push(hMaxSerial.extractRoot());
});
assert.deepEqual([7, 6, 5, 4, 3, 2, 1, 0], maxs);

const hMax = new Heap(false);
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    hMax.put(i);
});
assert.deepEqual([13, 12, 9, 11, 9, 4, 8, 4, 4], hMax.heap);
assert.deepEqual(13, hMax.extractRoot());
assert.deepEqual([12, 11, 9, 4, 9, 4, 8, 4], hMax.heap);

function getMedianSum(nums, onNewMedian) {
    const hLow = new Heap(true);
    const hHigh = new Heap(false);
    var medianSum0 = 0;
    nums.forEach(function (i) {
        var median = getMedian(hLow, hHigh, i);
        if (onNewMedian) {
            onNewMedian(median);
        }
        medianSum0 += median;
    });
    return medianSum0;
}
const medians = [];
const medianSum = getMedianSum([9, 9, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9], function (median) {
    medians.push(median);
});
assert.deepEqual([9, 9, 9, 7, 7, 3, 4, 4, 5, 5, 6, 6], medians);
assert.equal((9 + 9 + 9 + 7 + 7 + 3 + 4 + 4 + 5 + 5 + 6 + 6), medianSum);

assert.equal(55, getMedianSum([10, 1, 9, 2, 8, 3, 7, 4, 6, 5]));
assert.equal(54, getMedianSum([4, 5, 6, 7, 8, 9, 10, 1, 2, 3]));

assert.equal(148, getMedianSum([4, 14, 5, 13, 17, 6, 1, 7, 19, 8, 9, 10, 2, 3, 11, 20, 15, 16, 18, 12]));
assert.equal(82, getMedianSum([4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 8, 9, 14, -4]));

console.log('Pass');
