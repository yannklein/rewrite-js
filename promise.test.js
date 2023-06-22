/* eslint-disable prefer-numeric-literals */
/* eslint-disable no-loss-of-precision */
const YPromise = require('./promise');

describe('Number methods', () => {
  describe('#yPromise', () => {
    test('create a Promise object', () => {
      const promiseSuccess = new YPromise((resolve) => {
        setTimeout(() => {
          resolve('good');
        }, 500);
      });

      const promiseReject = new YPromise((_, reject) => {
        setTimeout(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('bad');
        }, 600);
      });

      expect(typeof promiseSuccess).toBe('object');
      expect(typeof promiseReject).toBe('object');

      promiseSuccess.then((good) => {
        expect(good).toBe('good');
        promiseReject.catch((bad) => {
          expect(bad).toBe('bad');
        });
      });
    });
  });
});
