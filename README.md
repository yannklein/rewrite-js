# Re-write JS

## An adventure to re-write every JS built-in method and get some knowledge out of it.

### Methods built
##### Array:
Every static and instance method.

##### Number:
- isFinite
- isInteger
- isNaN
- isSafeInteger
- parseFloat
- parseInt
- toExponential

### TIL so far:

#### Array:
- a function can have more args than it as params in its definition
- jest dummy function practice
- concat can be used on multiple array, or even with objects
- an array can have an empty value that is slighlty distinct from undefined (sparse array)
- Iterators are not global object in JS
- iterative method's callback functions can change the array it is called on but the amount of iteration varies whether we add elements (amount of iteration does not change) or remove elements (amount changes)
- findLast and findLastIndex new method avaiable from NodeJS 18
- proxy/handlers in JS
- one can detect sparse arrays empty slots with !(index in array)
- it's not that easy to check that something is an array or not: https://web.mit.edu/jwalden/www/isArray.html
- for-of doesn't ignore empty slot whereas Object.keys() does

#### Number:
- a JS number is hold on 64bits, 1 for the sign, 11 for the exp and 52bits for the 'mantissa' (number = -/+ mantissa * 10^exp)
- because of the 52bit mantissa, the biggest amount of digits for a number without data loss is 16 digits. 17 digits corresponds to 54bit which makes 12,345,678,901,234,567 become 12,345,678,901,234,568 in JS. 
- that makes us able to calculate what the finest precision we can reach in JS for a certain number which is 2^-52 called Number.EPSILON . Example: (1 + 2^-53) -> 1 (adding anything under the precision doesn't add it), (1 + 2^-52) -> 1.0000000000000002
- this have a direct effect on calculating infinity in JS. The biggest number before infinity is 1.7976931348623157E+308, called Number.MAX_VALUE . It's precision is Number.MAX_VALUE*Number.EPSILON = 3.9e292. Number.MAX_VALUE + 1 won't give Infinity but Number.MAX_VALUE itself whereas MAX_VALUE + MAX_VALUE*Number.EPSILON will give Infinity. Note that, 308-292 = 16 the approx max amount of digits JS number can handle.
