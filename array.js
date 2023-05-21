/* eslint-disable no-extend-native */
const Iterator = require('./iterator');

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
  const result = [];
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    result[result.length] = [index, element];
  }
  return new Iterator(result);
};

Array.prototype.yevery = function yevery(callbackFct, thisArg) {
  const originalArray = this;
  const originalLength = this.length;
  for (let index = 0; index < originalLength; index += 1) {
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
  const originalLength = this.length;
  for (let index = 0; index < originalLength; index += 1) {
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
  const originalLength = this.length;
  for (let index = 0; index < originalLength; index += 1) {
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

Array.prototype.yfindLast = function yfindLast(callbackFct, thisArg) {
  const originalArray = this;
  const originalLength = this.length;
  let found;
  for (let index = 0; index < originalLength; index += 1) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (result) {
      found = element;
    }
  }
  return found;
};

Array.prototype.yfindLastIndex = function yfindLastIndex(callbackFct, thisArg) {
  const originalArray = this;
  const originalLength = this.length;
  let foundIndex = -1;
  for (let index = 0; index < originalLength; index += 1) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (result) {
      foundIndex = index;
    }
  }
  return foundIndex;
};

Array.prototype.yflat = function yflat(depth = 1) {
  const originalArray = this;
  let newArray = [];
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    if (typeof element === 'object' && depth > 0) {
      newArray = [...newArray, ...element.yflat(depth - 1)];
    } else {
      newArray[newArray.length] = element;
    }
  }
  return newArray;
};

Array.prototype.yflatMap = function yflatMap(callback, thisArg) {
  const originalArray = this;
  const originalLength = originalArray.length;
  let newArray = [];
  for (let index = 0; index < originalLength; index += 1) {
    const element = originalArray[index];
    const newElement = callback.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (typeof newElement === 'object') {
      newArray = [...newArray, ...newElement];
    } else {
      newArray[newArray.length] = newElement;
    }
  }
  return newArray;
};

Array.prototype.yforEach = function yforEach(callback, thisArg) {
  const originalArray = this;
  const originalLength = originalArray.length;
  for (let index = 0; index < originalLength; index += 1) {
    const element = originalArray[index];
    callback.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
  }
};

Array.yfrom = function yfrom(array, callbackFct = (e) => e) {
  const newArray = [...array];
  for (let index = 0; index < newArray.length; index += 1) {
    const element = array[index];
    newArray[index] = callbackFct(element, index);
  }
  return newArray;
};

Array.yfromAsync = async function yfromAsync(asyncIterable) {
  const array = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const val of asyncIterable) {
    array[array.length] = val;
  }
  return array;
};

Array.prototype.ygroup = function ygroup(callbackFct, thisArg) {
  const originalArray = this;
  const handler = {
    get(target, prop) {
      return (prop === undefined) ? [] : target[prop];
    },
  };
  const groupedObjProxy = new Proxy({}, handler);
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    const key = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (!groupedObjProxy[key]) {
      groupedObjProxy[key] = [];
    }
    groupedObjProxy[key].push(element);
  }
  return groupedObjProxy;
};

Array.prototype.ygroup = function ygroup(callbackFct, thisArg) {
  const originalArray = this;
  const handler = {
    get(target, prop) {
      return target[prop] || [];
    },
  };
  const groupedObjProxy = new Proxy({}, handler);
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    const key = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    // if (!groupedObjProxy[key]) {
    //   groupedObjProxy[key] = [];
    // }
    groupedObjProxy[key] = [...groupedObjProxy[key], element];
  }
  return groupedObjProxy;
};

Array.prototype.ygroupToMap = function ygroupToMap(callbackFct, thisArg) {
  const originalArray = this;
  const newMap = new Map();
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    const key = callbackFct.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
    if (!newMap.has(key)) {
      newMap.set(key, []);
    }
    newMap.set(key, [...newMap.get(key), element]);
  }
  return newMap;
};

Array.prototype.yincludes = function yincludes(target, fromIndex = 0) {
  const originalArray = this;
  if (fromIndex >= originalArray.length) {
    return false;
  }
  const start = fromIndex >= 0 ? fromIndex : originalArray.length + fromIndex;
  for (let index = start; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    if (element === target || (Number.isNaN(element) && Number.isNaN(target))) {
      return true;
    }
  }
  return false;
};

Array.prototype.yindexOf = function yindexOf(target, fromIndex = 0) {
  const originalArray = this;
  if (fromIndex >= originalArray.length) {
    return -1;
  }
  const start = fromIndex >= 0 ? fromIndex : originalArray.length + fromIndex;
  for (let index = start; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    // !(index in originalArray) detects in the element of index index is an empty slot or not
    if (target === element && (index in originalArray)) {
      return index;
    }
  }
  return -1;
};

Array.yisArray = function yisArray(array) {
  return (Object.prototype.toString.call(array) === '[object Array]');
};

Array.prototype.yjoin = function yjoin(separator = ',') {
  const originalArray = this;
  let result = '';
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    if (result !== '') {
      result += separator;
    }
    if (element !== undefined) {
      result += element;
    }
  }
  return result;
};

Array.prototype.ykeys = function ykeys() {
  const originalArray = this;
  const result = [];
  for (let index = 0; index < originalArray.length; index += 1) {
    result[result.length] = index;
  }
  return new Iterator(result);
};

Array.prototype.ylastIndexOf = function ylastIndexOf(target, fromIndex = this.length - 1) {
  const originalArray = this;
  let lastIndex = -1;
  const end = fromIndex >= 0 ? fromIndex : originalArray.length + fromIndex;
  for (let index = 0; index <= end; index += 1) {
    const element = originalArray[index];
    // !(index in originalArray) detects in the element of index index is an empty slot or not
    if (target === element && (index in originalArray)) {
      lastIndex = index;
    }
  }
  return lastIndex;
};

Array.prototype.ymap = function ymap(callback, thisArg) {
  const originalArray = this;
  const originalLength = originalArray.length;
  const newArray = [];
  for (let index = 0; index < originalLength; index += 1) {
    const element = originalArray[index];
    newArray[newArray.length] = callback.bind(thisArg || this)(
      element,
      index,
      originalArray,
    );
  }
  return newArray;
};

Array.yof = function yof(...args) {
  const newArray = new this();
  for (let index = 0; index < args.length; index += 1) {
    const element = args[index];
    newArray[index] = element;
  }
  newArray.length = args.length;
  return newArray;
};
