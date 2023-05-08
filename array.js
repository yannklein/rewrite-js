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
  if (arguments.length === 2) {
    fromEnd = originalArray.length;
  } else if (arguments.length === 1) {
    fromStart = 0;
    fromEnd = originalArray.length - to;
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

// const arr = [1, 2].yconcat([3, , 5])
// console.log(arr);
// console.log(arr[3]);
// console.log([1,,2]);
// arr[6] = ""
// console.log(arr);