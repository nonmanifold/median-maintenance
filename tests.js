const assert = require('assert');
const median = require('./median');
const Heap = median.Heap;
const getMedian = median.getMedian;

const h = new Heap(true);
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    h.put(i);
});
assert.deepEqual([4, 4, 4, 8, 9, 11, 12, 9, 13], h.heap);
assert.deepEqual(4, h.extractRoot());
assert.deepEqual([4, 8, 4, 9, 9, 11, 12, 13], h.heap);

function getMedianSum(nums) {
    const hLow = new Heap(true);
    const hHigh = new Heap(false);
    var medianSum0 = 0;
    nums.forEach(function (i) {
        medianSum0 += getMedian(hLow, hHigh, i);
    });
    return medianSum0;
}

assert.equal(55, getMedianSum([10, 1, 9, 2, 8, 3, 7, 4, 6, 5]));
assert.equal(54, getMedianSum([4, 5, 6, 7, 8, 9, 10, 1, 2, 3]));
assert.equal(148, getMedianSum([4, 14, 5, 13, 17, 6, 1, 7, 19, 8, 9, 10, 2, 3, 11, 20, 15, 16, 18, 12]));
assert.equal(82, getMedianSum([4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 8, 9, 14, -4]));
/*
 assert.deepEqual([9, 9, 9, 7, 7, 3, 4, 4, 5, 5, 6, 6], medians);
 assert.equal((9 + 9 + 9 + 7 + 7 + 3 + 4 + 4 + 5 + 5 + 6 + 6), medianSum);
 */
console.log('Pass');
