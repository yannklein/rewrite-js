require('./array');

describe('Array methods', () => {
  describe('#yat', () => {
    test('returns 2 when called on [1, 2, 3] with argument 1', () => {
      const expected = 2;
      const actual = [1, 2, 3].yat(1);
      expect(expected).toEqual(actual);
    });

    test('returns 2 when called on [1, 2, 3] with argument -2', () => {
      const expected = 2;
      const actual = [1, 2, 3].yat(-2);
      expect(expected).toEqual(actual);
    });
    test('returns "b when .call() called on { length: 2, 0: "a", 1: "b"} with argument -1', () => {
      const expected = 'b';
      const arrayLike = { length: 2, 0: 'a', 1: 'b' };
      const actual = Array.prototype.yat.call(arrayLike, -1);
      expect(expected).toEqual(actual);
    });
  });

  describe('#yconcat', () => {
    test('returns [1, 2, 3, 4, 5, 6] when concat [1, 2, 3] and [4,5,6]', () => {
      const array1 = [1, 2, 3];
      const array2 = [4, 5, 6];
      const expected = [1, 2, 3, 4, 5, 6];
      const actual = array1.yconcat(array2);
      expect(expected).toEqual(actual);
    });
    test('can concat multiple arrays', () => {
      const array1 = [1, 2, 3];
      const array2 = [4, 5, 6];
      const array3 = [7, 8, 9];
      const array4 = [10, 11, 12];
      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const actual = array1.yconcat(array2, array3, array4);
      expect(expected).toEqual(actual);
    });
    test('does not change the existing arrays', () => {
      const array1 = [1, 2, 3];
      const array2 = [4, 5, 6];
      const newArray = array1.yconcat(array2);
      expect(array1).not.toBe(newArray);
      expect(array2).not.toBe(newArray);
    });
  });

  describe('#ycopyWithin', () => {
    test('should copy to index 0 the element at index 3 with args (0, 3, 4)', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const expected = [4, 2, 3, 4, 5, 6];
      const actual = array.ycopyWithin(0, 3, 4);
      expect(expected).toEqual(actual);
    });
    test('should copy to index 1 all elements from index 3 to the end with args (1, 3)', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const expected = [1, 4, 5, 6, 5, 6];
      const actual = array.ycopyWithin(1, 3);
      expect(expected).toEqual(actual);
    });
    test('should copy to index 1 all elements from index 0 to the end with arg (1)', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const expected = [1, 1, 2, 3, 4, 5];
      const actual = array.ycopyWithin(1);
      expect(expected).toEqual(actual);
    });

    test('should copy to index -2 all elements from index 0 to the end with arg (-2)', () => {
      const array = [1, 2, 3, 4, 5, 6];
      const expected = [1, 2, 3, 4, 1, 2];
      const actual = array.ycopyWithin(-2);
      expect(expected).toEqual(actual);
    });
  });

  describe('#yentries', () => {
    test('returns a new array iterator object that contains the key/value pairs for each index in the array', () => {
      const array = [1, 2, 3];
      const iterator = array.yentries();

      expect(iterator.next().value).toEqual([0, 1]);
      expect(iterator.next().value).toEqual([1, 2]);
      expect(iterator.next().value).toEqual([2, 3]);
    });

    test('returns undefined for sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1,, 3];
      const iterator = array.yentries();

      expect(iterator.next().value).toEqual([0, 1]);
      expect(iterator.next().value).toEqual([1, undefined]);
      expect(iterator.next().value).toEqual([2, 3]);
    });

    test('can loop on the entries returned iterator', () => {
      const someFunction = jest.fn();
      const arrIterator = [1, 2, 3].yentries();
      // eslint-disable-next-line no-restricted-syntax
      for (const value of arrIterator) {
        someFunction(value);
      }

      expect(someFunction).toHaveBeenNthCalledWith(1, [0, 1]);
      expect(someFunction).toHaveBeenNthCalledWith(2, [1, 2]);
      expect(someFunction).toHaveBeenNthCalledWith(3, [2, 3]);
    });
  });

  describe('#yevery', () => {
    test('returns false if at least one element does not pass the threshold', () => {
      const array = [1, 2, 3];
      const isBelowThreshold = jest.fn((currentValue) => currentValue < 3);
      const actual = array.yevery(isBelowThreshold);

      expect(actual).toBe(false);
    });
    test('returns true if all elements pass the threshold', () => {
      const array = [1, 2, 3];
      const isBelowThreshold = jest.fn((currentValue) => currentValue < 4);
      const actual = array.yevery(isBelowThreshold);

      expect(actual).toBe(true);
    });

    test('original array elements can be updated by callback function', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const changeArray = (elem, index, arr) => {
        // eslint-disable-next-line no-param-reassign
        arr[index + 1] -= 1;
        someFunction(`[${arr}][${index}] -> ${elem}`);
        return elem < 2;
      };
      array.yevery(changeArray);
      expect(someFunction).toHaveBeenNthCalledWith(1, '[1,1,3,4][0] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(2, '[1,1,2,4][1] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(3, '[1,1,2,3][2] -> 2');
    });

    test('original array elements can be added to callback function but amount of iteration does not change', () => {
      const array = [1, 2, 3];
      const someFunction = jest.fn();
      const changeArray = (elem, index, arr) => {
        arr.push('new');
        // console.log(`[${arr}][${index}] -> ${elem}`);
        someFunction(`[${arr}][${index}] -> ${elem}`);
        return elem < 4;
      };
      array.yevery(changeArray);
      expect(someFunction).toHaveBeenNthCalledWith(1, '[1,2,3,new][0] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(2, '[1,2,3,new,new][1] -> 2');
      expect(someFunction).toHaveBeenNthCalledWith(3, '[1,2,3,new,new,new][2] -> 3');
    });

    test('original array elements can be removed by callback function and amount of iteration does change', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const changeArray = (elem, index, arr) => {
        arr.pop();
        someFunction(`[${arr}][${index}] -> ${elem}`);
        return elem < 4;
      };
      array.yevery(changeArray);

      expect(someFunction).toHaveBeenNthCalledWith(1, '[1,2,3][0] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(2, '[1,2][1] -> 2');
    });

    test('the callback function\'s this become takes the value of the method 2nd arg', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem < 4;
      };
      array.yevery(conditionFct, { some: 'value' });

      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });
  });

  describe('#yfill', () => {
    test('fill with 0 from position 2 until position 4', () => {
      const array = [1, 2, 3, 4];
      const actual = array.yfill(0, 2, 4);
      const expected = [1, 2, 0, 0];
      expect(actual).toBe(array);
      expect(actual).toEqual(expected);
    });

    test('fill with 5 from position 1', () => {
      const array = [1, 2, 3, 4];
      const actual = array.yfill(5, 1);
      const expected = [1, 5, 5, 5];
      expect(actual).toBe(array);
      expect(actual).toEqual(expected);
    });

    test('fill everything with 6', () => {
      const array = [1, 2, 3, 4];
      const actual = array.yfill(6);
      const expected = [6, 6, 6, 6];
      expect(actual).toBe(array);
      expect(actual).toEqual(expected);
    });

    test('should work on negative args edge cases', () => {
      expect([1, 2, 3].yfill(4)).toEqual([4, 4, 4]);
      expect([1, 2, 3].yfill(4, 1)).toEqual([1, 4, 4]);
      expect([1, 2, 3].yfill(4, 1, 2)).toEqual([1, 4, 3]);
      expect([1, 2, 3].yfill(4, 1, 1)).toEqual([1, 2, 3]);
      expect([1, 2, 3].yfill(4, 3, 3)).toEqual([1, 2, 3]);
      expect([1, 2, 3].yfill(4, -3, -2)).toEqual([4, 2, 3]);
      expect([1, 2, 3].yfill(4, NaN, NaN)).toEqual([1, 2, 3]);
      expect([1, 2, 3].yfill(4, 3, 5)).toEqual([1, 2, 3]);
      expect(Array(3).yfill(4)).toEqual([4, 4, 4]);
    });
  });

  describe('#yfind', () => {
    test('should find first array element making the callback return true', () => {
      const array = [5, 12, 8, 130, 44];
      const actual = array.yfind((element) => element > 10);
      expect(actual).toBe(12);
    });

    test('should return undefined if callback never returns true', () => {
      const array = [5, 12, 8, 130, 44];
      const actual = array.yfind((element) => element > 1000);
      expect(actual).toBe(undefined);
    });

    test('the callback function\'s this takes the value of the method 2nd arg if present', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem < 2;
      };
      array.yfind(conditionFct, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });
  });

  describe('#yfindIndex', () => {
    test('should return the index of the first array element making the callback return true', () => {
      const array = [5, 12, 8, 130, 44];
      const actual = array.yfindIndex((element) => element > 10);
      expect(actual).toBe(1);
    });

    test('should return -1 if callback never returns true', () => {
      const array = [5, 12, 8, 130, 44];
      const actual = array.yfindIndex((element) => element > 1000);
      expect(actual).toBe(-1);
    });

    test('the callback function\'s this become takes the value of the method 2nd arg', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem < 2;
      };
      array.yfindIndex(conditionFct, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });
  });

  describe('#yfindLast', () => {
    test('should return the last array element making the callback return true', () => {
      const array = [5, 120, 8, 130, 44];
      const actual = array.yfindLast((element) => element > 100);
      expect(actual).toBe(130);
    });

    test('should return undefined if callback never returns true', () => {
      const array = [5, 120, 8, 130, 44];
      const actual = array.yfindLast((element) => element > 1000);
      expect(actual).toBe(undefined);
    });

    test('the callback function\'s this become takes the value of the method 2nd arg', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem < 2;
      };
      array.yfindLast(conditionFct, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });
  });

  describe('#yfindLastIndex', () => {
    test('should return the index of the first array element making the callback return true', () => {
      const array = [5, 120, 8, 130, 44];
      const actual = array.yfindLastIndex((element) => element > 100);
      expect(actual).toBe(3);
    });

    test('should return -1 if callback never returns true', () => {
      const array = [5, 12, 8, 130, 44];
      const actual = array.yfindLastIndex((element) => element > 1000);
      expect(actual).toBe(-1);
    });

    test('the callback function\'s this become takes the value of the method 2nd arg', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem < 2;
      };
      array.yfindLastIndex(conditionFct, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });
  });

  describe('#yflat', () => {
    test('flat on simple nested array without args returns a flat array', () => {
      const array = [1, 2, [3, 4]];
      const actual = array.yflat();
      expect(actual).toEqual([1, 2, 3, 4]);
    });

    test('flat returns a shallow copy that contains the same elements as the ones from the original array', () => {
      const array = [1, 2, [3, 4]];
      const actual = array.yflat();
      expect(actual).not.toBe(array);
    });

    test('call on double nested array without args returns a simple nested array', () => {
      const array = [1, 2, [3, 4, [5, 6]]];
      const actual = array.yflat();
      expect(actual).toEqual([1, 2, 3, 4, [5, 6]]);
    });

    test('call on double nested array with 2 as arg returns a flat array', () => {
      const array = [1, 2, [3, 4, [5, 6]]];
      const actual = array.yflat(2);
      expect(actual).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('call on multi nested array with Infinity as arg returns a flat array', () => {
      const array = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
      const actual = array.yflat(Infinity);
      expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test('works with array-like non array objects', () => {
      const arrayLike = {
        length: 3,
        0: [1, 2],
        // Array-like objects aren't flattened
        1: { length: 2, 0: 3, 1: 4 },
        2: 5,
      };
      const actual = Array.prototype.flat.call(arrayLike);
      expect(actual).toEqual([1, 2, { 0: 3, 1: 4, length: 2 }, 5]);
    });
  });

  describe('#yflatMap', () => {
    test('return a mapped then flatten new array', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn((num) => (num === 2 ? [2, 2] : 1));
      const actual = array.yflatMap(someFunction);
      expect(actual).toEqual([1, 2, 2, 1]);
    });
    test('return a copy of the original array, doesn\'t modify it', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn((num) => (num === 2 ? [2, 2] : 1));
      const actual = array.yflatMap(someFunction);
      expect(actual).not.toBe(array);
    });
    test('the callback function\'s this takes the value of the method 2nd arg if present', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return [elem];
      };
      array.yflatMap(conditionFct, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });

    test('original array elements can be updated by callback function', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn();
      const changeArray = (elem, index, arr) => {
        // eslint-disable-next-line no-param-reassign
        arr[index + 1] -= 1;
        someFunction(`[${arr}][${index}] -> ${elem}`);
        return [elem];
      };
      array.yflatMap(changeArray);
      expect(someFunction).toHaveBeenNthCalledWith(1, '[1,1,1][0] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(2, '[1,1,0][1] -> 1');
    });
  });

  describe('#yforEach', () => {
    test('someFunction 1 then 2 then 3 when passed item => someFunction(item)', () => {
      const someFunction = jest.fn();
      [1, 2, 3].yforEach((item) => someFunction(item));

      expect(someFunction).toHaveBeenNthCalledWith(1, 1);
      expect(someFunction).toHaveBeenNthCalledWith(2, 2);
      expect(someFunction).toHaveBeenNthCalledWith(3, 3);
    });

    test('accepts a function with one argument (item)', () => {
      const someFunction = jest.fn();
      [1, 2, 3].yforEach((item) => someFunction(item));

      expect(someFunction.mock.calls).toHaveLength(3);
    });

    test('accepts a function with two arguments (item and index)', () => {
      const someFunction = jest.fn();
      [1, 2, 3].yforEach((item, index) => someFunction(item, index));

      expect(someFunction).toHaveBeenNthCalledWith(1, 1, 0);
      expect(someFunction).toHaveBeenNthCalledWith(2, 2, 1);
      expect(someFunction).toHaveBeenNthCalledWith(3, 3, 2);
    });

    test('accepts a function with three arguments (item, index and array)', () => {
      const someFunction = jest.fn();
      [1, 2, 3].yforEach((item, index, arr) => someFunction(item, index, arr));

      expect(someFunction).toHaveBeenNthCalledWith(1, 1, 0, [1, 2, 3]);
      expect(someFunction).toHaveBeenNthCalledWith(2, 2, 1, [1, 2, 3]);
      expect(someFunction).toHaveBeenNthCalledWith(3, 3, 2, [1, 2, 3]);
    });

    test('the callback function\'s this takes the value of the method 2nd arg if present', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn();
      function forEachFct() {
        someFunction(this);
      }
      array.yforEach(forEachFct, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });

    test('original array elements can be updated by callback function', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn();
      const changeArray = (elem, index, arr) => {
        // eslint-disable-next-line no-param-reassign
        arr[index + 1] -= 1;
        someFunction(`[${arr}][${index}] -> ${elem}`);
      };
      array.yforEach(changeArray);
      expect(someFunction).toHaveBeenNthCalledWith(1, '[1,1,1][0] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(2, '[1,1,0][1] -> 1');
    });
  });

  describe('#yfrom', () => {
    test('create a shallow copy array from an array or a array-like object', () => {
      const actualFromString = Array.yfrom('foo');
      const array = ['f', 'o', 'o'];
      const actualFromArray = Array.yfrom(array);
      expect(actualFromString).toEqual(['f', 'o', 'o']);
      expect(actualFromArray).toEqual(['f', 'o', 'o']);
      expect(actualFromArray).not.toBe(array);
    });

    test('create a shallow copy array from an array modify by a mapping callback function (second argument)', () => {
      const array = [1, 2, 3];
      const actual = Array.yfrom([1, 2, 3], (x) => x + x);
      expect(actual).toEqual([2, 4, 6]);
      expect(actual).not.toBe(array);
    });
  });

  describe('#yfromAsync', () => {
    test('create an array from a async iterable', async () => {
      const asyncIterable = (async function* asyncIterable() {
        for (let i = 0; i < 5; i += 1) {
          // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
          await new Promise((resolve) => setTimeout(resolve, 10 * i));
          yield i;
        }
      }());
      const actual = await Array.yfromAsync(asyncIterable);
      await expect(actual).toEqual([0, 1, 2, 3, 4]);
    });
    test('create an array from a sync iterable', async () => {
      const map = new Map([
        [1, 2],
        [3, 4],
      ]);
      const actual = await Array.yfromAsync(map);
      await expect(actual).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe('#ygroup', () => {
    test('groups element according to callback fct retun', () => {
      const inventory = [
        { name: 'asparagus', type: 'vegetables', quantity: 5 },
        { name: 'bananas', type: 'fruit', quantity: 0 },
        { name: 'cherries', type: 'fruit', quantity: 5 },
      ];
      const expected = {
        vegetables: [
          { name: 'asparagus', type: 'vegetables', quantity: 5 },
        ],
        fruit: [
          { name: 'bananas', type: 'fruit', quantity: 0 },
          { name: 'cherries', type: 'fruit', quantity: 5 },
        ],
      };
      const actual = inventory.ygroup(({ type }) => type);
      expect(actual).toEqual(expected);
    });
    test('the callback function\'s this become takes the value of the method 2nd arg', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem;
      };
      array.ygroup(conditionFct, { some: 'value' });

      expect(someFunction).toHaveBeenCalledWith({ some: 'value' });
    });
  });

  describe('#ygroupToMap', () => {
    test('groups element according to callback fct retun', () => {
      const inventory = [
        { name: 'asparagus', type: 'vegetables', quantity: 9 },
        { name: 'bananas', type: 'fruit', quantity: 5 },
        { name: 'goat', type: 'meat', quantity: 23 },
      ];
      const expected = new Map();
      expected.set('restock', [{ name: 'bananas', type: 'fruit', quantity: 5 }]);
      expected.set('sufficient', [
        { name: 'asparagus', type: 'vegetables', quantity: 9 },
        { name: 'goat', type: 'meat', quantity: 23 },
      ]);

      const actual = inventory.ygroupToMap(({ quantity }) => (quantity < 6 ? 'restock' : 'sufficient'));
      expect(actual).toEqual(expected);
    });

    test('the callback function\'s this become takes the value of the method 2nd arg', () => {
      const array = [1, 2, 3, 4];
      const someFunction = jest.fn();
      const conditionFct = function conditionFct(elem) {
        someFunction(this);
        return elem;
      };
      array.ygroupToMap(conditionFct, { some: 'value' });

      expect(someFunction).toHaveBeenCalledWith({ some: 'value' });
    });
  });

  describe('#yincludes', () => {
    test('return true if element included in array else false', () => {
      expect([1, 2, 3].yincludes(2)).toBe(true);
      expect([1, 2, 3].yincludes(4)).toBe(false);
      expect([1, 2, NaN].yincludes(NaN)).toBe(true);
    });
    test('search inclusion from a certain index in the array', () => {
      expect([1, 2, 3].yincludes(3, -1)).toBe(true);
    });
    test('if second arg bigger than the array length, return false', () => {
      expect([1, 2, 3].yincludes(3, 3)).toBe(false);
    });
    test('use strict equality to check if included in array', () => {
      expect(['1', '2', '3'].yincludes(3)).toBe(false);
    });
    test('finds undefined on sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect([1,, 3].yincludes(undefined)).toBe(true);
    });
    test('works on array-like', () => {
      const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
      };
      expect(Array.prototype.yincludes.call(arrayLike, 2)).toBe(true);
      expect(Array.prototype.yincludes.call(arrayLike, 1)).toBe(false);
    });
  });

  describe('#yindexOf', () => {
    test('return index of element or -1 if not found', () => {
      const array = [2, 9, 9];
      expect(array.yindexOf(2)).toBe(0);
      expect(array.yindexOf(7)).toBe(-1);
    });

    test('return index of element searched from a certain index (2nd arg) or -1 if not found', () => {
      const array = [2, 9, 9];
      expect(array.yindexOf(9, 2)).toBe(2);
      expect(array.yindexOf(2, -1)).toBe(-1);
      expect(array.yindexOf(2, -3)).toBe(0);
    });

    test('return -1 if passed NaN', () => {
      const array = [NaN];
      expect(array.yindexOf(NaN)).toBe(-1);
    });

    test('return -1 if search index of undefiend on sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect([1, , 3].yindexOf(undefined)).toBe(-1);
    });

    test('works on array-like objects', () => {
      const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
      };
      expect(Array.prototype.yindexOf.call(arrayLike, 2)).toBe(0);
      expect(Array.prototype.yindexOf.call(arrayLike, 5)).toBe(-1);
    });
  });

  describe('#yisArray', () => {
    test('return true if array or false', () => {
      expect(Array.yisArray([])).toBe(true);
      expect(Array.yisArray([1])).toBe(true);
      // eslint-disable-next-line no-array-constructor
      expect(Array.yisArray(new Array())).toBe(true);
      // eslint-disable-next-line no-array-constructor
      expect(Array.yisArray(new Array('a', 'b', 'c', 'd'))).toBe(true);
      expect(Array.yisArray(new Array(3))).toBe(true);
      expect(Array.yisArray(Array.prototype)).toBe(true);

      // all following calls return false
      expect(Array.yisArray()).toBe(false);
      expect(Array.yisArray({})).toBe(false);
      expect(Array.yisArray(null)).toBe(false);
      expect(Array.yisArray(undefined)).toBe(false);
      expect(Array.yisArray(17)).toBe(false);
      expect(Array.yisArray('Array')).toBe(false);
      expect(Array.yisArray(true)).toBe(false);
      expect(Array.yisArray(false)).toBe(false);
      expect(Array.yisArray(new Uint8Array(32))).toBe(false);
      expect(Array.yisArray({ __proto__: Array.prototype })).toBe(false);
    });
  });

  describe('#yjoin', () => {
    test('return a joined string with an optional separator', () => {
      const a = ['Wind', 'Water', 'Fire'];
      expect(a.yjoin()).toEqual('Wind,Water,Fire');
      expect(a.yjoin(', ')).toEqual('Wind, Water, Fire');
      expect(a.yjoin(' + ')).toEqual('Wind + Water + Fire');
      expect(a.yjoin('')).toEqual('WindWaterFire');
    });

    test('works on sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect([1, , 3].yjoin()).toBe('1,,3');
      expect([1, undefined, 3].yjoin()).toBe('1,,3');
    });

    test('works on array-like objects', () => {
      const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
      };
      expect(Array.prototype.yjoin.call(arrayLike)).toBe('2,3,4');
      expect(Array.prototype.yjoin.call(arrayLike, '.')).toBe('2.3.4');
    });
  });

  describe('#ykeys', () => {
    test('returns a new array iterator object that contains the key/value pairs for each index in the array', () => {
      const array = [1, 2, 3];
      const iterator = array.ykeys();

      expect(iterator.next().value).toEqual(0);
      expect(iterator.next().value).toEqual(1);
      expect(iterator.next().value).toEqual(2);
    });

    test('returns undefined for sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1,, 3];
      const iterator = array.ykeys();

      expect(iterator.next().value).toEqual(0);
      expect(iterator.next().value).toEqual(1);
      expect(iterator.next().value).toEqual(2);
    });

    test('can loop on the keys returned iterator', () => {
      const someFunction = jest.fn();
      const arrIterator = [1, 2, 3].ykeys();
      // eslint-disable-next-line no-restricted-syntax
      for (const value of arrIterator) {
        someFunction(value);
      }

      expect(someFunction).toHaveBeenNthCalledWith(1, 0);
      expect(someFunction).toHaveBeenNthCalledWith(2, 1);
      expect(someFunction).toHaveBeenNthCalledWith(3, 2);
    });
  });

  describe('#ylastIndexOf', () => {
    test('return index of element or -1 if not found', () => {
      const array = [2, 9, 9];
      expect(array.ylastIndexOf(9)).toBe(2);
      expect(array.ylastIndexOf(7)).toBe(-1);
    });

    test('return index of element searched from a certain index (2nd arg) or -1 if not found', () => {
      const array = [2, 9, 9];
      expect(array.ylastIndexOf(9, 1)).toBe(1);
      expect(array.ylastIndexOf(9, 2)).toBe(2);
      expect(array.ylastIndexOf(2, -1)).toBe(0);
      expect(array.ylastIndexOf(2, -3)).toBe(0);
    });

    test('return -1 if passed NaN', () => {
      const array = [NaN];
      expect(array.ylastIndexOf(NaN)).toBe(-1);
    });

    test('return -1 if search index of undefiend on sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect([1, , 3].ylastIndexOf(undefined)).toBe(-1);
    });

    test('works on array-like objects', () => {
      const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
      };
      expect(Array.prototype.ylastIndexOf.call(arrayLike, 2)).toBe(0);
      expect(Array.prototype.ylastIndexOf.call(arrayLike, 5)).toBe(-1);
    });
  });

  describe('#ymap', () => {
    test('returns ["1", "2", "3"] when pass [1, 2, 3] with (n) => n.toString()', () => {
      const expected = ['1', '2', '3'];
      const actual = [1, 2, 3].ymap((n) => n.toString());
      expect(expected).toEqual(actual);
    });

    test('return a copy of the original array, doesn\'t modify it', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn((num) => (num === 2 ? [2, 2] : 1));
      const actual = array.ymap(someFunction);
      expect(actual).not.toBe(array);
    });
    test('the callback function\'s this takes the value of the method 2nd arg if present', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn();
      const callback = function callback(elem) {
        someFunction(this);
        return [elem];
      };
      array.ymap(callback, { some: 'value' });
      expect(someFunction).toHaveBeenNthCalledWith(1, { some: 'value' });
    });

    test('original array elements can be updated by callback function', () => {
      const array = [1, 2, 1];
      const someFunction = jest.fn();
      const changeArray = (elem, index, arr) => {
        // eslint-disable-next-line no-param-reassign
        arr[index + 1] -= 1;
        someFunction(`[${arr}][${index}] -> ${elem}`);
        return [elem];
      };
      array.ymap(changeArray);
      expect(someFunction).toHaveBeenNthCalledWith(1, '[1,1,1][0] -> 1');
      expect(someFunction).toHaveBeenNthCalledWith(2, '[1,1,0][1] -> 1');
    });
  });

  describe('#yof', () => {
    test('returns and array from the passed arguments', () => {
      expect(Array.yof(1)).toEqual([1]);
      expect(Array.yof(1, 2, 3)).toEqual([1, 2, 3]);
      expect(Array.yof(undefined)).toEqual([undefined]);
    });
    test('works on non-array constructors', () => {
      function NotArray(len) {
        return len;
      }
      expect(Array.yof.call(NotArray, 1, 2, 3)).toEqual(NotArray({
        0: 1, 1: 2, 2: 3, length: 3,
      }));
      expect(Array.yof.call(NotArray, 1, 2, 3) instanceof NotArray).toBe(true);
      expect(typeof Array.yof.call(Object)).toBe('object');
      expect(Array.yof.call(Object) instanceof Object).toBe(true);
    });
  });

  describe('#ypop', () => {
    test('remove the last element of the array and returns it', () => {
      const array = [1, 2, 3];
      const actual = array.ypop();
      expect(actual).toBe(3);
      expect(array).toEqual([1, 2]);
    });
    test('returns undefined for empty arrays', () => {
      const array = [];
      const actual = array.ypop();
      expect(actual).toBe(undefined);
      expect(array).toEqual([]);
    });
    test('works on array-like objects', () => {
      const arrayLike = {
        length: 3,
        unrelated: 'foo',
        2: 4,
      };
      const actual = Array.prototype.ypop.call(arrayLike);
      expect(actual).toBe(4);
      expect(arrayLike).toEqual({ length: 2, unrelated: 'foo' });
    });
  });

  describe('#ypush', () => {
    test('pushes on or many elements into an array', () => {
      const array = [1, 2, 3];
      expect(array.ypush(4)).toBe(4);
      expect(array).toEqual([1, 2, 3, 4]);
      expect(array.ypush(5, 6, 10)).toBe(7);
      expect(array).toEqual([1, 2, 3, 4, 5, 6, 10]);
    });
    test('works on array-like objects', () => {
      const arrayLike = {
        length: 3,
        unrelated: 'foo',
        2: 4,
      };
      const actual = Array.prototype.ypush.call(arrayLike, 1, 2);
      expect(actual).toBe(5);
      expect(arrayLike).toEqual({
        2: 4, 3: 1, 4: 2, length: 5, unrelated: 'foo',
      });
    });
  });
  describe('#yreduce', () => {
    test('reduce an array with inital value', () => {
      const array = [1, 2, 3, 4];
      const initialValue = 10;
      const actual = array.yreduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      expect(actual).toBe(20);
    });
    test('reduce an array without inital value', () => {
      const array = [1, 2, 3, 4];
      const actual = array.yreduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );
      expect(actual).toBe(10);
    });
  });
});
