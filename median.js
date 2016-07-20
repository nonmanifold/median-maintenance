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
        if (i % 2 === 0) {
            return i / 2;
        } else {
            return Math.floor(i / 2);
        }
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
            if (preferredChildPos === false) {
                break; // no children present
            }
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
        } else if (this.checkIdxIsInside(childAidx)) {
            return childAidx;
        } else if (this.checkIdxIsInside(childBidx)) {
            return childBidx;
        } else {
            return false;
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
function getMedian(heapLow, heapHigh, xk) {
    if (heapLow.getLength() > 0) {
        if (xk <= heapLow.getRootValue()) {
            heapLow.put(xk);
        } else {
            heapHigh.put(xk);
        }
    } else {
        heapLow.put(xk);
    }

    // re-balance heaps
    if (heapLow.getLength() > heapHigh.getLength() + 1) {
        heapHigh.put(heapLow.extractRoot());
    } else if (heapHigh.getLength() > heapLow.getLength() + 1) {
        heapLow.put(heapHigh.extractRoot());
    }

    const k = heapLow.getLength() + heapHigh.getLength();
    var mk;
    if (k % 2 !== 0) {
        mk = (k + 1) / 2;
    } else {
        mk = k / 2;
    }
    if (heapLow.getLength() === mk) {
        return heapLow.getRootValue();
    } else {
        return heapHigh.getRootValue();
    }
}

module.exports = {
    getMedian,
    Heap
};