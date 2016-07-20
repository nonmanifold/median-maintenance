function Heap(isExtractMin) {
    this.isMin = isExtractMin;
    this.heap = [];

    this.bubbleUpCheck = function (parentPos, x) {
        if (this.isMin) {
            return this.heap[parentPos] > x;
        } else {
            return this.heap[parentPos] < x;
        }
    };

    this.put = function (x) {
        this.heap.push(x);
        if (this.heap.length > 1) {
            var parentPos = this.getParent(this.heap.length - 1);
            var xPos = this.heap.length - 1;
            while (this.bubbleUpCheck(parentPos, x)) {
                this.swap(xPos, parentPos);
                xPos = parentPos;
                parentPos = this.getParent(xPos);
            }
        }
    };

    this.getParent = function (i) {
        return Math.floor((i + 1) / 2) - 1;
    };
    this.getChildren = function (i, childrenArr /* to reduce allocations, we can re-use this tuple */) {
        childrenArr[0] = 2 * (i + 1) - 1;
        childrenArr[1] = childrenArr[0] + 1;
        return childrenArr;
    };
    this.swap = function (a, b) {
        const temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    };

    this.extractRoot = function () {
        var oldRoot = this.heap[0];
        this.swap(0, this.heap.length - 1); // make last element the new temp root
        this.heap.length = this.heap.length - 1;// chop off last null element
        if (this.heap.length <= 1) {
            return oldRoot;
        }
        var pos = 0;
        var children = [1, 2];

        // now lets fix the heapLow property of the tree:
        while (!(this.checkHeapProperty(pos, children) )) {
            var preferredChildPos = this.getPreferredChildIdx(children);
            this.swap(pos, preferredChildPos);
            pos = preferredChildPos;
            children = this.getChildren(pos, children);
        }
        return oldRoot;
    };
    this.isHeapPhopertyForChildViolated = function (rootValue, childIdx) {
        if (this.isMin) {
            return rootValue > this.heap[childIdx];
        } else {
            return rootValue < this.heap[childIdx];
        }
    };

    this.checkHeapProperty = function (rootIdx, children) {
        const childAidx = children[0];
        const childBidx = children[1];
        const rootValue = this.heap[rootIdx];
        if (this.checkIdxIsInside(childAidx) && this.isHeapPhopertyForChildViolated(rootValue, childAidx)) {
            return false;
        } else if (this.checkIdxIsInside(childBidx) && this.isHeapPhopertyForChildViolated(rootValue, childBidx)) {
            return false;
        } else {
            return true;
        }
    };
    this.compareChildren = function (childAidx, childBidx) {
        if (this.isMin) {
            return this.heap[childAidx] <= this.heap[childBidx]
        } else {
            return this.heap[childAidx] >= this.heap[childBidx]
        }
    };
    this.getPreferredChildIdx = function (children) {
        const childAidx = children[0];
        const childBidx = children[1];
        if (this.checkIdxIsInside(childAidx) && this.checkIdxIsInside(childBidx)) {
            if (this.compareChildren(childAidx, childBidx)) {
                return childAidx;
            } else {
                return childBidx;
            }
        } else {
            return childAidx;
        }
    };
    this.checkIdxIsInside = function (idx) {
        return idx <= this.heap.length - 1;
    };

    this.getLength = function () {
        return this.heap.length;
    };
    this.getRootValue = function () {
        return this.heap[0];
    };
}
function getMedian(maxHeap, minHeap, xk) {

    if (maxHeap.getLength() > 0) {
        if (xk <= maxHeap.getRootValue()) {
            maxHeap.put(xk);
        } else {
            minHeap.put(xk);
        }
    } else {
        maxHeap.put(xk);
    }

    // re-balance heaps
    if (maxHeap.getLength() > minHeap.getLength() + 1) {
        minHeap.put(maxHeap.extractRoot());
    } else if (minHeap.getLength() > maxHeap.getLength() + 1) {
        maxHeap.put(minHeap.extractRoot());
    }
 /*
     var size = maxHeap.getLength() + minHeap.getLength();
     if (size == 0) {
     maxHeap.put(xk);
     } else if (size % 2 == 0) {
     if (xk > minHeap.getRootValue()) {
     maxHeap.put(minHeap.extractRoot());
     minHeap.put(xk);
     } else {
     maxHeap.put(xk);
     }

     } else {
     if (xk < maxHeap.getRootValue()) {
     minHeap.put(maxHeap.extractRoot());
     maxHeap.put(xk);
     } else {
     minHeap.put(xk);
     }
     }

     return maxHeap.getRootValue();
     */
    const k = maxHeap.getLength() + minHeap.getLength();
    var mk;
    if (k % 2 !== 0) {
        mk = (k + 1) / 2;
    } else {
        mk = k / 2;
    }

    if (maxHeap.getLength() === mk) {
        return maxHeap.getRootValue();
    } else {
        return minHeap.getRootValue();
    }
}

module.exports = {
    getMedian,
    Heap
};