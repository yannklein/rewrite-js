require('./array');

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

Number.yisNaN = function yisNaN(num) {
  // eslint-disable-next-line use-isnan
  if (typeof num !== 'number' || !Object.is(num, NaN)) {
    return false;
  }
  return true;
};

Number.yisSafeInteger = function yisSafeInteger(num) {
  if (
    typeof num === 'number'
    && Math.abs(num.ytoString(2).length) <= 53
    && num % 1 === 0
  ) {
    return true;
  }
  return false;
};

Number.yparseFloat = function yparseFloat(numString) {
  let resultNum = 0;
  const numbers = {
    0: 0, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2, 1: 1,
  };
  if (!Object.keys(numbers).yincludes(numString[0])) {
    return NaN;
  }
  const [wholes, decimals] = numString.split(/\D+/);
  for (let index = 0; index < wholes.length; index += 1) {
    const num = wholes[index];
    resultNum += num * 10 ** (wholes.length - 1 - index);
  }
  if (decimals) {
    for (let index = 0; index < decimals.length; index += 1) {
      const num = decimals[index];
      resultNum += num / 10 ** (index + 1);
    }
  }
  return resultNum;
};

Number.yparseInt = function yparseInt(numString, radix = 10) {
  let resultNum = 0;
  const numbers = {
    0: 0, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2, 1: 1,
  };
  if (
    !Object.keys(numbers).yincludes(numString[0])
    || radix > 36
    || radix < 2
  ) {
    return NaN;
  }
  const [wholes] = numString.split(/\D+/);
  for (let index = 0; index < wholes.length; index += 1) {
    const num = wholes[index];
    resultNum += num * radix ** (wholes.length - 1 - index);
  }
  return resultNum;
};

Number.prototype.ytoExponential = function ytoExponential(fractionDigits) {
  const splitNum = this.toString().split('.');
  const digits = splitNum[0].length;
  const consolidatedNum = splitNum.join('');
  let newDecimal = consolidatedNum.slice(1);
  if (fractionDigits !== undefined) {
    newDecimal = consolidatedNum.slice(1, fractionDigits + 1);
  }
  return `${consolidatedNum[0]}.${newDecimal}e+${digits - 1}`;
};
