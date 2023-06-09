/* eslint-disable prefer-numeric-literals */
/* eslint-disable no-loss-of-precision */
require('./number');

describe('Number methods', () => {
  describe('#yisFinite', () => {
    test('returns true if finite, false if infinite', () => {
      expect(Number.yisFinite(Infinity)).toBe(false);
      expect(Number.yisFinite(NaN)).toBe(false);
      expect(Number.yisFinite(-Infinity)).toBe(false);
      expect(Number.yisFinite(0)).toBe(true);
      expect(Number.yisFinite(2e64)).toBe(true);
      expect(Number.yisFinite(Number.MAX_VALUE)).toBe(true);
      expect(Number.yisFinite(Number.MAX_VALUE + 1)).toBe(true);
      expect(Number.yisFinite(Number.MAX_VALUE + Number.MAX_VALUE * Number.EPSILON)).toBe(false);
      expect(Number.yisFinite(Number.MAX_VALUE + 9.9e+291)).toBe(true);
      expect(Number.yisFinite(Number.MAX_VALUE + 10e+291)).toBe(false);
    });

    test('returns false for non-numbers', () => {
      expect(Number.yisFinite('0')).toBe(false);
      expect(Number.yisFinite(null)).toBe(false);
    });
  });

  describe('#yisInteger', () => {
    test('returns true if number is whole', () => {
      expect(Number.yisInteger(0)).toBe(true);
      expect(Number.yisInteger(1)).toBe(true);
      expect(Number.yisInteger(-100000)).toBe(true);
      expect(Number.yisInteger(99999999999999999999999)).toBe(true);

      expect(Number.yisInteger(0.1)).toBe(false);
      expect(Number.yisInteger(Math.PI)).toBe(false);

      expect(Number.yisInteger(NaN)).toBe(false);
      expect(Number.yisInteger(Infinity)).toBe(false);
      expect(Number.yisInteger(-Infinity)).toBe(false);
      expect(Number.yisInteger('10')).toBe(false);
      expect(Number.yisInteger(true)).toBe(false);
      expect(Number.yisInteger(false)).toBe(false);
      expect(Number.yisInteger([1])).toBe(false);

      expect(Number.yisInteger(5.0)).toBe(true);
      expect(Number.yisInteger(5.000000000000001)).toBe(false);
      expect(Number.yisInteger(5.0000000000000001)).toBe(true);
      expect(Number.yisInteger(4500000000000000.1)).toBe(true);
    });
  });

  describe('#yisNaN', () => {
    test('returns true if number is whole', () => {
      expect(Number.yisNaN(NaN)).toBe(true);
      expect(Number.yisNaN(Number.NaN)).toBe(true);
      expect(Number.yisNaN(0 / 0)).toBe(true);
      expect(Number.yisNaN(37)).toBe(false);
    });

    test('returns false for non-numbers', () => {
      expect(Number.yisNaN('NaN')).toBe(false);
      expect(Number.yisNaN(undefined)).toBe(false);
      expect(Number.yisNaN({})).toBe(false);
      expect(Number.yisNaN('blabla')).toBe(false);
      expect(Number.yisNaN(true)).toBe(false);
      expect(Number.yisNaN(null)).toBe(false);
      expect(Number.yisNaN('37')).toBe(false);
      expect(Number.yisNaN('37.37')).toBe(false);
      expect(Number.yisNaN('')).toBe(false);
      expect(Number.yisNaN(' ')).toBe(false);
    });
  });

  describe('#yisSafeInteger', () => {
    test('returns true if number is safely whole', () => {
      expect(Number.isSafeInteger(3)).toBe(true);
      expect(Number.isSafeInteger(2 ** 53)).toBe(false);
      expect(Number.isSafeInteger(2 ** 53 - 1)).toBe(true);
      expect(Number.isSafeInteger(NaN)).toBe(false);
      expect(Number.isSafeInteger(Infinity)).toBe(false);
      expect(Number.isSafeInteger('3')).toBe(false);
      expect(Number.isSafeInteger(3.1)).toBe(false);
      expect(Number.isSafeInteger(3.0)).toBe(true);
    });
  });

  describe('#yparseFloat', () => {
    test('returns true if number is whole', () => {
      expect(Number.yparseFloat('2')).toBe(2);
      expect(Number.yparseFloat('23')).toBe(23);
      expect(Number.yparseFloat('3.0')).toBe(3);
      expect(Number.yparseFloat('4.5')).toBe(4.5);
      expect(Number.yparseFloat('0004.5')).toBe(4.5);
      expect(Number.yparseFloat('4.5asdfasd')).toBe(4.5);
      expect(Number.yparseFloat('asd4.5')).toBe(NaN);
    });
  });

  describe('#yparseInt', () => {
    test('returns true if number is whole', () => {
      expect(Number.yparseInt('2', 10)).toBe(2);
      expect(Number.yparseInt('23', 10)).toBe(23);
      expect(Number.yparseInt('3.0', 10)).toBe(3);
      expect(Number.yparseInt('4.5', 10)).toBe(4);
      expect(Number.yparseInt('0004.5', 10)).toBe(4);
      expect(Number.yparseInt('4.5asdfasd', 10)).toBe(4);
      expect(Number.yparseInt('asd4.5', 10)).toBe(NaN);
      expect(Number.yparseInt('101', 2)).toBe(5);
      expect(Number.yparseInt('1000', 16)).toBe(4096);
      expect(Number.yparseInt('100', 36)).toBe(1296);
      // eslint-disable-next-line radix
      expect(Number.yparseInt('100', 42)).toBe(NaN);
      expect(Number.yparseInt('100', 1)).toBe(NaN);
    });
  });

  describe('#ytoExponential', () => {
    test('returns a string representing the Number object in exponential notation', () => {
      const numObj = 77.1234;
      expect(numObj.ytoExponential()).toBe('7.71234e+1');
      expect(numObj.ytoExponential(4)).toBe('7.7123e+1');
      expect(numObj.ytoExponential(2)).toBe('7.71e+1');
      expect((77.1234).ytoExponential()).toBe('7.71234e+1');
      expect((77).ytoExponential()).toBe('7.7e+1');
    });
  });
});
