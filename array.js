Array.prototype.ymap = function (callback) {
  const originalArray = this;
  const newArray = [];
  for (let index = 0; index < originalArray.length; index+=1) {
    const element = originalArray[index];
    newArray[newArray.length] = callback(element);
  }
  return newArray;
}

Array.prototype.yforEach = function(callback) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index+=1) {
    const element = originalArray[index];
    callback(element, index, originalArray);
  }
}

Array.prototype.yat = function(index) {
  const originalArray = this;
  return (index >= 0 ? originalArray[index] : originalArray[originalArray.length + index]);
}

Array.prototype.yconcat = function() {
  const originalArray = this;
  const newArray = Array.from(originalArray);
  let counter = newArray.length
  for (let indexArg = 0; indexArg < arguments.length; indexArg++) {
    const argArray = arguments[indexArg];
    for (let indexArr = 0; indexArr < argArray.length; indexArr++) {
      const element = argArray[indexArr];
      if (element) {
        newArray[counter] = element; 
      }
      counter += 1;
    } 
  }
  return newArray;
}

Array.prototype.ycopyWithin = function(to, fromStart, fromEnd) {
  const originalArray = this;
  const tmpArray = [];

  // edge cases to
  if (to >= originalArray.length) {
    return originalArray;
  } else if (to < -originalArray.length) {
    to = 0;
  } else if (to < 0) {
    to += originalArray.length;
  }

  // edge cases fromStart
  if (fromStart >= originalArray.length) {
    return originalArray;
  } else if (fromStart === undefined || fromStart < -originalArray.length) {
    fromStart = 0;
  } else if (fromStart <  0) {
    fromStart += originalArray.length;
  }

  // edge cases fromEnd
  if (fromEnd >= originalArray.length) {
    return originalArray;
  } else if ( fromEnd < -originalArray.length) {
    fromEnd = 0;
  } else if (fromEnd < 0) {
    fromEnd += originalArray.length;
  } else if (fromEnd === undefined) {
    fromEnd = arguments.length === 2 ? originalArray.length : originalArray.length - to;
  }

  for (let index = 0; index < (fromEnd - fromStart); index++) {
    tmpArray[to + index] = originalArray[fromStart + index];
  }
  for (let index = 0; index < tmpArray.length; index++) {
    if (tmpArray[index]) {
      originalArray[index] = tmpArray[index];
    }
  }
  return originalArray;
}

Array.prototype.yentries = function() {
  const originalArray = this;

  const IteratorProto = {
    next() {
      const currentCounter = this.counter;
      const currentElement = this.array[currentCounter];
      this.counter = this.counter + 1;
      return {
        value: [currentCounter, currentElement], 
        done: currentCounter === this.array.length};
    },
    [Symbol.iterator]() {
      return this;
    }
  }

  function Iterator(array) {
    this.counter = 0;
    this.array = array;
  }

  Object.assign(Iterator.prototype, IteratorProto);
  const iterator = new Iterator(originalArray);
  return iterator;
}