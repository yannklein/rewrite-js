/* eslint-disable no-extend-native */
Number.yisFinite = function yisFinite(num) {
  if (
    typeof num === 'number'
    && num <= Number.MAX_VALUE
    && num >= -Number.MAX_VALUE
  ) {
    return true;
  }
  return false;
};

Number.prototype.yconcat = function yconcat(...args) {
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
