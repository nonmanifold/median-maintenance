function Heap(isMin) {
    this.isMin = isMin;
    this.heap = [];

    this.bubbleCheck = function (parentPos, x) {
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
            while (this.bubbleCheck(parentPos, x)) {
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

        // now lets fix the heap property of the tree:
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
    this.checkHeapPhopertyForChild = function (rootValue, childAidx) {
        if (this.isMin) {
            return rootValue > this.heap[childAidx];
        } else {
            return rootValue < this.heap[childAidx];
        }
    };

    this.checkHeapProperty = function (rootIdx, children) {
        const childAidx = children[0];
        const childBidx = children[1];
        const rootValue = this.heap[rootIdx];
        if (this.checkIdxIsInside(childAidx) && this.checkHeapPhopertyForChild(rootValue, childAidx)) {
            return false;
        } else if (this.checkIdxIsInside(childBidx) && this.checkHeapPhopertyForChild(rootValue, childBidx)) {
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

    this.getIthRoot = function (i) {
        const originalHeap = this.heap.slice(0); // a shallow copy of our array with integers
        for (var j = 0; j < i; j++) {
            this.extractRoot();
        }
        const ithSmallest = this.extractRoot();
        this.heap = originalHeap; // restore back original heap
        return ithSmallest;
    };
}
function getMidx(totalElements) {
    if (totalElements % 2 === 0) {
        // k is even
        return totalElements / 2;
    } else {
        return (totalElements + 1) / 2;
    }
}
function getMedian(heap, xk) {
    heap.put(xk);
    const mIdx = getMidx(heap.heap.length) - 1;
    //console.log(mIdx + ' out of ' + heap.heap.length);
    return heap.getIthRoot(mIdx);
}

module.exports = {
    getMedian,
    getMidx,
    Heap
};