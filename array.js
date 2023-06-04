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
    callback.bind(thisArg || this)(element, index, originalArray);
  }
};

Array.yfrom = function yfrom(array, callbackFct = (e) => e) {
  const newArray = [];
  for (let index = 0; index < array.length; index += 1) {
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
      return prop === undefined ? [] : target[prop];
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
    if (target === element && index in originalArray) {
      return index;
    }
  }
  return -1;
};

Array.yisArray = function yisArray(array) {
  return Object.prototype.toString.call(array) === '[object Array]';
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

Array.prototype.ylastIndexOf = function ylastIndexOf(
  target,
  fromIndex = this.length - 1,
) {
  const originalArray = this;
  let lastIndex = -1;
  const end = fromIndex >= 0 ? fromIndex : originalArray.length + fromIndex;
  for (let index = 0; index <= end; index += 1) {
    const element = originalArray[index];
    // !(index in originalArray) detects in the element of index index is an empty slot or not
    if (target === element && index in originalArray) {
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

Array.prototype.ypop = function ypop() {
  const originalArray = this;
  const originalLength = originalArray.length;
  if (originalArray.length === 0) {
    return undefined;
  }
  const lastElement = originalArray[originalLength - 1];
  delete originalArray[originalLength - 1];
  originalArray.length = originalLength - 1;
  return lastElement;
};

Array.prototype.ypush = function ypush(...args) {
  const originalArray = this;
  let currentLength = originalArray.length;
  for (let index = 0; index < args.length; index += 1) {
    const element = args[index];
    originalArray[currentLength] = element;
    currentLength += 1;
  }
  originalArray.length = currentLength;
  return originalArray.length;
};

Array.prototype.yreduce = function yreduce(callback, initialValue) {
  const originalArray = this;
  let accumulator;
  let startIndex;
  if (initialValue) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // eslint-disable-next-line prefer-destructuring
    accumulator = originalArray[0];
    startIndex = 1;
  }
  for (let index = startIndex; index < originalArray.length; index += 1) {
    const element = originalArray[index];
    accumulator = callback(accumulator, element, index, originalArray);
  }
  return accumulator;
};

Array.prototype.yreduceRight = function yreduceRight(callback, initialValue) {
  const originalArray = this;
  let accumulator;
  let startIndex;
  if (initialValue) {
    accumulator = initialValue;
    startIndex = originalArray.length - 1;
  } else {
    // eslint-disable-next-line prefer-destructuring
    accumulator = originalArray[originalArray.length - 1];
    startIndex = originalArray.length - 2;
  }
  for (let index = startIndex; index > -1; index -= 1) {
    const element = originalArray[index];
    accumulator = callback(accumulator, element, index, originalArray);
  }
  return accumulator;
};

Array.prototype.yreverse = function yreverse() {
  const originalArray = this;
  const copyArray = Array.yfrom(originalArray);
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = copyArray[originalArray.length - 1 - index];
    originalArray[index] = element;
  }
  return originalArray;
};

Array.prototype.yshift = function yshift() {
  const originalArray = this;
  const originalLength = originalArray.length;
  const firstElement = originalArray[0];
  if (originalArray.length === 0) {
    return undefined;
  }
  for (let index = 0; index < originalLength; index += 1) {
    originalArray[index] = originalArray[index + 1];
  }
  delete originalArray[originalLength - 1];
  originalArray.length = originalLength - 1;
  return firstElement;
};

Array.prototype.yslice = function yslice(start = 0, end = this.length) {
  const originalArray = this;
  const slicedArray = [];

  let absStart = start;
  let absEnd = end;

  if (start >= originalArray.length) {
    return slicedArray;
  }
  if (start < -originalArray.length) {
    absStart = 0;
  } else if (start < 0) {
    absStart = this.length + start;
  }

  if (end < -originalArray.length) {
    absEnd = 0;
  } else if (end < 0) {
    absEnd = this.length + end;
  }

  for (let index = absStart; index < absEnd; index += 1) {
    slicedArray[slicedArray.length] = originalArray[index];
  }
  return slicedArray;
};

Array.prototype.ysome = function ysome(callbackFct, thisArg) {
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
      return true;
    }
  }
  return false;
};

Array.prototype.ysort = function ysort(callback) {
  const originalArray = this;
  function merge(nums1, nums2) {
    let index1 = 0;
    let index2 = 0;
    while (index2 <= nums2.length - 1) {
      const num1 = nums1[index1];
      const num2 = nums2[index2];
      let condition = (num1?.toString() < num2?.toString());
      if (callback) {
        condition = callback(num1, num2) < 0;
      }
      if (condition) {
        nums2.splice(index2, 0, nums1[index1]);
        index1 += 1;
      }
      index2 += 1;
    }
    if (index1 <= nums1.length - 1) {
      return nums2.yconcat(nums1.slice(index1));
    }
    return nums2;
  }

  function sortArray(nums) {
    if (nums.length === 1) return nums;

    const midIndex = Math.round(nums.length / 2);
    let lowers = nums.yslice(0, midIndex);
    let highers = nums.yslice(midIndex);

    if (lowers.length > 1) {
      lowers = sortArray(lowers);
    }
    if (highers.length > 1) {
      highers = sortArray(highers);
    }
    return merge(lowers, highers);
  }
  const sortedArray = sortArray(originalArray);
  for (let index = 0; index < sortedArray.length; index += 1) {
    originalArray[index] = sortedArray[index];
  }
  return originalArray;
};

Array.prototype.ysplice = function ysplice(start, deleteCount = this.length - start, ...items) {
  const originalArray = this;
  const deletedItems = [];

  let absStart = start;
  if (start < 0) {
    absStart = originalArray.length + start;
  }
  // deletion
  const delTmpArray = Array.yfrom(originalArray);
  // if some deletion needed
  if (deleteCount) {
    // retrieve the items to delete
    for (let index = absStart; index < (absStart + deleteCount); index += 1) {
      deletedItems[deletedItems.length] = delTmpArray[index];
    }
    // slide every items to the left in the original array
    for (let index = absStart; index < (delTmpArray.length - deleteCount); index += 1) {
      originalArray[index] = delTmpArray[index + deleteCount];
    }
    // recalculate the original array length (and remove the right side duplicate elements)
    originalArray.length -= deleteCount;
    // for non-arrays, remove the right side duplicate elements manually
    for (let index = 0; index < deleteCount; index += 1) {
      delete originalArray[originalArray.length + index];
    }
  }

  // addition
  const addTmpArray = Array.yfrom(originalArray);
  if (items.length !== 0) {
    // calculate and assign new array length after addition of elements
    const newLength = addTmpArray.length + items.length;
    originalArray.length = newLength;

    for (let index = absStart; index < newLength; index += 1) {
      // calculate new element value,
      // it's the args one if still some to add
      // or the remaining original array ones if none left anymore
      const newValue = items[index - absStart] || addTmpArray[index - items.length];
      originalArray[index] = newValue;
    }
  }
  return deletedItems;
};

Array.prototype.ytoLocaleString = function ytoLocaleString(lang, options) {
  const originalArray = this;
  const localArray = originalArray.map((elt) => elt.toLocaleString(lang, options));
  return localArray.join();
};

Array.prototype.ytoReversed = function ytoReversed() {
  const originalArray = this;
  const copyArray = Array.yfrom(originalArray);
  for (let index = 0; index < originalArray.length; index += 1) {
    const element = originalArray[originalArray.length - 1 - index];
    copyArray[index] = element;
  }
  return copyArray;
};

Array.prototype.ytoSorted = function ytoSorted(callback) {
  const originalArray = this;

  function merge(nums1, nums2) {
    let index1 = 0;
    let index2 = 0;
    while (index2 <= nums2.length - 1) {
      const num1 = nums1[index1];
      const num2 = nums2[index2];
      let condition = (num1?.toString() < num2?.toString());
      if (callback) {
        condition = callback(num1, num2) < 0;
      }
      if (condition) {
        nums2.splice(index2, 0, nums1[index1]);
        index1 += 1;
      }
      index2 += 1;
    }
    if (index1 <= nums1.length - 1) {
      return nums2.yconcat(nums1.slice(index1));
    }
    return nums2;
  }

  function sortArray(nums) {
    if (nums.length === 1) return nums;

    const midIndex = Math.round(nums.length / 2);
    let lowers = nums.yslice(0, midIndex);
    let highers = nums.yslice(midIndex);

    if (lowers.length > 1) {
      lowers = sortArray(lowers);
    }
    if (highers.length > 1) {
      highers = sortArray(highers);
    }
    return merge(lowers, highers);
  }

  return sortArray(originalArray);
};

Array.prototype.ytoSpliced = function ytoSpliced(
  start,
  deleteCount = this.length - start,
  ...items
) {
  const originalArray = this;

  let absStart = start;
  if (start < 0) {
    absStart = originalArray.length + start;
  }
  // deletion
  const splicedArray = Array.yfrom(originalArray);
  // if some deletion needed
  if (deleteCount) {
    // slide every items to the left in the original array
    for (let index = absStart; index < (originalArray.length - deleteCount); index += 1) {
      splicedArray[index] = originalArray[index + deleteCount];
    }
    // recalculate the slpiced array length (and remove the right side duplicate elements)
    splicedArray.length -= deleteCount;
    // for non-arrays, remove the right side duplicate elements manually
    for (let index = 0; index < deleteCount; index += 1) {
      delete splicedArray[splicedArray.length + index];
    }
  }

  // addition
  const addTmpArray = Array.yfrom(splicedArray);
  if (items.length !== 0) {
    // calculate and assign new array length after addition of elements
    const newLength = addTmpArray.length + items.length;
    splicedArray.length = newLength;

    for (let index = absStart; index < newLength; index += 1) {
      // calculate new element value,
      // it's the args one if still some to add
      // or the remaining original array ones if none left anymore
      const newValue = items[index - absStart] || addTmpArray[index - items.length];
      splicedArray[index] = newValue;
    }
  }
  return splicedArray;
};
