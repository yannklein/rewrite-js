# Re-write JS

## An adventure to re-write every JS built-in method and get some knowledge out of it.

### Methods built
##### Array:
- at
- concat
- copyWithin
- each
- map

### TIL so far:
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