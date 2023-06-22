/* eslint-disable no-restricted-globals */
console.log(self);
self.addEventListener('message', (event) => {
  event.data();
  self.close();
});
