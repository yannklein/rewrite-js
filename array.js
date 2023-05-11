const Iterator = require("./iterator"); 

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

Array.prototype.ycopyWithin = function(to, fromStart = 0, fromEnd = this.length) {
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
  } else if (fromStart <  0) {
    fromStart += originalArray.length;
  } else if (fromStart < -originalArray.length) {
    fromStart = 0;
  } 

  // edge cases fromEnd
  if ( fromEnd < -originalArray.length) {
    fromEnd = 0;
  } else if (fromEnd < 0) {
    fromEnd += originalArray.length;
  }

  for (let index = 0; index < (fromEnd - fromStart); index++) {
    tmpArray[to + index] = originalArray[fromStart + index];
  }
  // iterate over original array to keep original array size and cut the additional elements for the tmp array
  for (let index = 0; index < originalArray.length; index++) {
    if (tmpArray[index]) {
      originalArray[index] = tmpArray[index];
    }
  }
  return originalArray;
}

Array.prototype.yentries = function() {
  const originalArray = this;
  return new Iterator(originalArray);
}

Array.prototype.yevery = function(callbackFct, thisArg) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index++) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(element, index, originalArray);
    if (!result) {
      return false;
    }
  }
  return true;
}

Array.prototype.yfill = function(value, start = 0 , end = this.length) {
  const originalArray = this;
  if (start < 0) {
    start += originalArray.length;
  } else if (start < -originalArray.length) {
    start = 0;
  } 
  if (end >= originalArray.length) {
    end = originalArray.length;
  } else if (end < 0) {
    end += originalArray.length;
  }
  for (let index = start; index < end; index++) {
    originalArray[index] = value;
  }
  return originalArray;
}

Array.prototype.yfind = function(callbackFct, thisArg) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index++) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(element, index, originalArray);
    if (result) {
      return element;
    }
  }
}

Array.prototype.yfindIndex = function(callbackFct, thisArg) {
  const originalArray = this;
  for (let index = 0; index < originalArray.length; index++) {
    const element = originalArray[index];
    const result = callbackFct.bind(thisArg || this)(element, index, originalArray);
    if (result) {
      return index;
    }
  }
  return -1;
}