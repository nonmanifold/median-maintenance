const assert = require('assert');
const median = require('./median');
const Heap = median.Heap;
const getMedian = median.getMedian;

const h = new Heap();
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    h.put(i);
});
assert.deepEqual([4, 4, 4, 8, 9, 11, 12, 9, 13], h.heap);
assert.deepEqual(4, h.extractMin());
assert.deepEqual([4, 8, 4, 9, 9, 11, 12, 13], h.heap);

console.log('Pass');
