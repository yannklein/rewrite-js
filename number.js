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

Number.yisInteger = function yisInteger(num) {
  if (
    typeof num === 'number'
    && num % 1 === 0
  ) {
    return true;
  }
  return false;
};
