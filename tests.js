const assert = require('assert');
const median = require('./median');
const Heap = median.Heap;
const getMedian = median.getMedian;
const getMidx = median.getMidx;

const h = new Heap();
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    h.put(i);
});
assert.deepEqual([4, 4, 4, 8, 9, 11, 12, 9, 13], h.heap);
assert.deepEqual(4, h.extractMin());
assert.deepEqual([4, 8, 4, 9, 9, 11, 12, 13], h.heap);
assert.deepEqual(4, h.getIthSmallest(0));
assert.deepEqual(4, h.getIthSmallest(1));
assert.deepEqual(8, h.getIthSmallest(2));
assert.deepEqual(9, h.getIthSmallest(3));
assert.deepEqual(9, h.getIthSmallest(4));
assert.deepEqual(11, h.getIthSmallest(5));
assert.deepEqual(12, h.getIthSmallest(6));
assert.deepEqual(13, h.getIthSmallest(7));
// verify that after getting Nth smallest elements heap is still the same:
assert.deepEqual([4, 8, 4, 9, 9, 11, 12, 13], h.heap);

assert.equal(1, getMidx(1));
assert.equal(1, getMidx(2));
assert.equal(2, getMidx(3));

const h2 = new Heap();
[13, 11, 9, 12, 9, 4, 8, 4, 4].forEach(function (i) {
    console.log(getMidx(h2.heap.length+1), getMedian(h2, i), h2.heap);
});

console.log('Pass');
