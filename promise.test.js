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

      promiseSuccess
        .ythen((good) => {
          expect(good).toBe('good');

          promiseReject.ycatch((bad) => {
            expect(bad).toBe('bad');
          });
        })
        .ythen((good) => {
          expect(good).toBe('good');
        });
    });
  });

  describe('#yresolve', () => {
    test('resolves a given value to a Promise', () => {
      const promise1 = YPromise.yresolve(123);

      promise1.ythen((value) => {
        expect(value).toBe(123);
      });
    });
  });

  // describe('#yall', () => {
  //   test('takes an iterable of promises as input and returns a single Promise', () => {
  //     const promise1 = YPromise.resolve(3);
  //     const promise2 = 42;
  //     const promise3 = new YPromise((resolve) => {
  //       setTimeout(resolve, 100, 'foo');
  //     });

  //     Promise.all([promise1, promise2, promise3]).then((values) => {
  //       expect(values).toEqual([3, 42, 'foo']);
  //     });
  //   });
  // });
});
