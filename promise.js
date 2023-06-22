// eslint-disable-next-line import/no-import-module-exports
const { Worker, parentPort, isMainThread } = require('worker_threads');

const yPromiseProto = {
  then(fct) {
    // setTimeout(() => this.callback(fct), 0);
    if (!isMainThread) {
      parentPort.postMessage(this.callback.bind(null, fct));
    }
  },
  catch(fct) {
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

Object.assign(YPromise.prototype, yPromiseProto);

module.exports = YPromise;
