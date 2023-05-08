require('./array');

describe('Array methods', () => {
  describe('#ymap', () => {
    test('returns ["1", "2", "3"] when pass [1,2,3] with (n) => n.toString()', () => {
      const expected = ["1", "2", "3"];
      const actual = [1,2,3].ymap((n) => n.toString())
      expect(expected).toEqual(actual);
    });
  });

  describe('#yforEach', () => {
    test('someFunction 1 then 2 then 3 when passed item => someFunction(item)', () => {
      someFunction1 = jest.fn();
      [1,2,3].yforEach(item => someFunction1(item));

      expect(someFunction1).toHaveBeenNthCalledWith(1, 1);
      expect(someFunction1).toHaveBeenNthCalledWith(2, 2);
      expect(someFunction1).toHaveBeenNthCalledWith(3, 3);
    });

    test('accepts a function with one argument (item)', () => {
      someFunction2 = jest.fn();
      [1,2,3].yforEach(item => someFunction2(item));

      expect(someFunction2.mock.calls).toHaveLength(3);
    });

    test('accepts a function with two arguments (item and index)', () => {
      someFunction3 = jest.fn();
      [1,2,3].yforEach((item, index) => someFunction3(item, index));

      expect(someFunction3).toHaveBeenNthCalledWith(1, 1, 0);
      expect(someFunction3).toHaveBeenNthCalledWith(2, 2, 1);
      expect(someFunction3).toHaveBeenNthCalledWith(3, 3, 2);
    });

    test('accepts a function with three arguments (item, index and array)', () => {
      someFunction4 = jest.fn();
      [1,2,3].yforEach((item, index, arr) => someFunction4(item, index, arr));

      expect(someFunction4).toHaveBeenNthCalledWith(1, 1, 0, [1,2,3]);
      expect(someFunction4).toHaveBeenNthCalledWith(2, 2, 1, [1,2,3]);
      expect(someFunction4).toHaveBeenNthCalledWith(3, 3, 2, [1,2,3]);
    });
    
  });

  describe('#yat', () => {
    test('returns 2 when called on [1,2,3] with argument 1', () => {
      const expected = 2;
      const actual = [1,2,3].yat(1)
      expect(expected).toEqual(actual);
    });

    test('returns 2 when called on [1,2,3] with argument -2', () => {
      const expected = 2;
      const actual = [1,2,3].yat(-2)
      expect(expected).toEqual(actual);
    });
    test('returns "b when .call() called on { length: 2, 0: "a", 1: "b"} with argument -1', () => {
      const expected = "b";
      const arrayLike = { length: 2, 0: "a", 1: "b"};
      const actual = Array.prototype.yat.call(arrayLike, -1)
      expect(expected).toEqual(actual);
    });
  });

  describe('#yconcat', () => {
    test('returns [1,2,3,4,5,6] when concat [1,2,3] and [4,5,6]', () => {
      const array1 = [1,2,3];
      const array2 = [4,5,6];
      const expected = [1,2,3,4,5,6];
      const actual = array1.yconcat(array2)
      expect(expected).toEqual(actual);
    });
    test('can concat multiple arrays', () => {
      const array1 = [1,2,3];
      const array2 = [4,5,6];
      const array3 = [7,8,9];
      const array4 = [10,11,12];
      const expected = [1,2,3,4,5,6,7,8,9,10,11,12];
      const actual = array1.yconcat(array2, array3, array4)
      expect(expected).toEqual(actual);
    });
    test('does not change the existing arrays', () => {
      const array1 = [1,2,3];
      const array2 = [4,5,6];
      const newArray = array1.yconcat(array2)
      expect(array1).not.toBe(newArray);
      expect(array2).not.toBe(newArray);
    });
  });

  describe('#ycopyWithin', () => {
    test('should copy to index 0 the element at index 3 with args (0, 3, 4)', () => {
      const array = [1,2,3,4,5,6];
      const expected = [4,2,3,4,5,6];
      const actual = array.ycopyWithin(0, 3, 4)
      expect(expected).toEqual(actual);
    });
    test('should copy to index 1 all elements from index 3 to the end with args (1, 3)', () => {
      const array = [1,2,3,4,5,6];
      const expected = [1,4,5,6,5,6];
      const actual = array.ycopyWithin(1, 3)
      expect(expected).toEqual(actual);
    });
    test('should copy to index 1 all elements from index 0 to the end with arg (1)', () => {
      const array = [1,2,3,4,5,6];
      const expected = [1,1,2,3,4,5];
      const actual = array.ycopyWithin(1)
      expect(expected).toEqual(actual);
    });

    test('should copy to index -2 all elements from index 0 to the end with arg (-2)', () => {
      const array = [1,2,3,4,5,6];
      const expected = [1,2,3,4,1,2];
      const actual = array.ycopyWithin(-2)
      expect(expected).toEqual(actual);
    });
  });
});