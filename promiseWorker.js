/* eslint-disable no-restricted-globals */
self.addEventListener('message', (event) => {
  event.data();
  self.close();
});
