/* eslint-disable no-extend-native */
const Iterator = require('./iterator');

Array.prototype.ymap = function ymap(callback) {
  const originalArray = this;
  const newArray = [];
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    newArray[newArray.length] = callback(element);
  }
  return newArray;
};

Array.prototype.yforEach = function yforEach(callback) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    callback(element, index, originalArray);
  }
};

Array.prototype.yat = function yat(index) {
  const originalArray = this;
  return index >= 0
    ? originalArray[index]
    : originalArray[originalArray.length + index];
};

Array.prototype.yconcat = function yconcat(...args) {
  const originalArray = this;
  const newArray = Array.from(originalArray);
  let counter = newArray.length;
  for (let indexArg = 0; indexArg < arguments.length; indexArg += 1) {
    const argArray = args[indexArg];
    for (let indexArr = 0; indexArr < argArray.length; indexArr += 1) {
      const element = argArray[indexArr];
      if (element) {
        newArray[counter] = element;
      }
      counter += 1;
    }
  }
  return newArray;
};

Array.prototype.ycopyWithin = function ycopyWithin(
  to,
  fromStart = 0,
  fromEnd = this.length,
) {
  const originalArray = this;
  const tmpArray = [];
  let start = fromStart;
  let end = fromEnd;
  let target = to;

  // edge cases to
  if (target >= originalArray.length) {
    return originalArray;
  }
  if (target < -originalArray.length) {
    target = 0;
  } else if (target < 0) {
    target += originalArray.length;
  }

  // edge cases fromStart
  if (start >= originalArray.length) {
    return originalArray;
  }
  if (start < 0) {
    start += originalArray.length;
  } else if (start < -originalArray.length) {
    start = 0;
  }

  // edge cases fromEnd
  if (end < 0) {
    end += originalArray.length;
  } else if (end < -originalArray.length) {
    end = 0;
  }

  for (let index = 0; index < end - start; index += 1) {
    tmpArray[target + index] = originalArray[start + index];
  }
  // iterate over original array to keep original array size
  // and cut the additional elements for the tmp array
  for (let index = 0; index < originalArray.length; index += 1) {
    if (tmpArray[index]) {
      originalArray[index] = tmpArray[index];
    }
  }
  return originalArray;
};

Array.prototype.yentries = function yentries() {
  const originalArray = this;
  return new Iterator(originalArray);
};

Array.prototype.yevery = function yevery(callbackFct, thisArg) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (!result) {
      return false;
    }
  }
  return true;
};

Array.prototype.yfill = function yfill(value, start = 0, end = this.length) {
  const originalArray = this;
  let startVal = start;
  let endVal = end;
  if (startVal < 0) {
    startVal += originalArray.length;
  } else if (startVal < -originalArray.length) {
    startVal = 0;
  }
  if (endVal >= originalArray.length) {
    endVal = originalArray.length;
  } else if (endVal < 0) {
    endVal += originalArray.length;
  }
  for (let index = startVal; index < endVal; index += 1) {
    originalArray[index] = value;
  }
  return originalArray;
};

Array.prototype.yfind = function yfind(callbackFct, thisArg) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (result) {
      return element;
    }
  }
  return undefined;
};

Array.prototype.yfindIndex = function yfindIndex(callbackFct, thisArg) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (result) {
      return index;
    }
  }
  return -1;
};
