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
});
