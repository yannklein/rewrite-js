const IteratorProto = {
  next() {
    const currentCounter = this.counter;
    const currentElement = this.array[currentCounter];
    this.counter += 1;
    return {
      value: currentElement,
      done: currentCounter === this.array.length,
    };
  },
  [Symbol.iterator]() {
    return this;
  },
};

function Iterator(array) {
  this.counter = 0;
  this.array = array;
}

Object.assign(Iterator.prototype, IteratorProto);

module.exports = Iterator;
