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
});
