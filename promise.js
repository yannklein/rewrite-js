// eslint-disable-next-line import/no-import-module-exports
const { Worker, parentPort, isMainThread } = require('worker_threads');

const yPromiseProto = {
  ythen(fct) {
    // setTimeout(() => this.callback(fct), 0);
    if (!isMainThread) {
      parentPort.postMessage(this.callback.bind(null, fct));
    }
  },
  ycatch(fct) {
    // setTimeout(() => this.callback(null, fct), 0);
    if (!isMainThread) {
      parentPort.postMessage(this.callback.bind(null, null, fct));
    }
  },
};

function YPromise(callback) {
  this.callback = callback;
  this.worker = new Worker(__filename);
  this.worker.on('message', (fct) => { fct(); });
}

YPromise.yresolve = function yresolve(value) {
  return new this((resFct) => resFct(value));
};

Object.assign(YPromise.prototype, yPromiseProto);

module.exports = YPromise;
