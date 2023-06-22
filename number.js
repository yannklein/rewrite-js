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

// TODO: modify toFixed to pass remaining tests (commented out for the time being :P)
Number.prototype.ytoFixed = function ytoFixed(frac = 0) {
  const truncatedNum = Math.round((this + Number.EPSILON) * (10 ** frac)) / (10 ** frac);
  let zeros = '';
  const decimal = truncatedNum.toString().split('.')[1] || '';
  if (frac > decimal.length) {
    if (!truncatedNum.toString().includes('.')) {
      zeros += '.';
    }
    for (let index = 0; index < (frac - decimal.length); index += 1) {
      zeros += '0';
    }
  }
  return `${truncatedNum}${zeros}`;
};

Number.prototype.ytoLocaleString = function ytoLocaleString(locales, options) {
  return new Intl.NumberFormat(locales, options).format(this);
};

// Number.prototype.ytoPrecision = function ytoPrecision(precision) {
//   const numStr = `${this}`;
//   if (precision === undefined) {
//     return numStr;
//   }
//   if (numStr.includes('.')) {
//     let slicedNum = numStr.slice(0, precision + 1);
//     if (slicedNum[slicedNum.length - 1] === '.') {
//       slicedNum = slicedNum.slice(0, -1);
//     }
//     return slicedNum;
//   }
//   return numStr;
// };

Number.prototype.ytoString = function ytoString(radix = 10) {
  // hexadecimal converter
  const numToHexa = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  let numStr = '';
  // find the biggest digit
  let maxDigit = 0;
  let remainder = Math.abs(this);
  while (remainder >= radix ** (maxDigit + 1)) {
    maxDigit += 1;
  }
  // iterate over each digit from the biggest digit
  // eslint-disable-next-line for-direction
  // for (let digit = maxDigit; digit >= 0; digit -= 1) {
  let digit = maxDigit;
  while (remainder > 0 || digit >= 0) {
    // iterate for unit from radix - 1 to 0
    // eslint-disable-next-line for-direction
    for (let unit = radix - 1; unit >= 0; unit -= 1) {
      // if unit * radix**digit smaller than continue
      if (remainder >= unit * (radix ** digit)) {
        // num -= unit * radix, store unit * radix in numStr and break
        // add a . if we start taking care of decimal nums
        if (remainder < 1 && remainder > 0 && !numStr.includes('.')) {
          numStr += '.';
        }
        // get decimal length to round floating point nums with endless digit
        const decimalLen = `${remainder}`.split('.')[1]?.length || 0;
        // substract the unit * (radix ** digit) to remainder
        remainder -= unit * (radix ** digit);
        // round remainder if endless decimal
        remainder = (remainder).toFixed(decimalLen);
        // add unit to the str number
        numStr += numToHexa[unit];
        break;
      }
    }
    digit -= 1;
  }
  // manage negative nums
  if (this < 0) {
    numStr = `-${numStr}`;
  }
  return numStr;
};
