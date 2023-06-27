// eslint-disable-next-line import/no-import-module-exports
// const { Worker, isMainThread } = require('worker_threads');

const yPromiseProto = {
  then(fct) {
    setTimeout(() => this.callback(fct), 0);
    // this.worker.postMessage(this.callback.bind(null, fct)); //DOESNT WORK BECAUSE a postMessage cannot take a function here for workaround: https://stackoverflow.com/questions/42297169/post-function-to-webworker
    return this;
  },
  catch(fct) {
    setTimeout(() => this.callback(null, fct), 0);
    // this.worker.postMessage(this.callback.bind(null, null, fct));  //DOESNT WORK BECAUSE a postMessage cannot take a function here for workaround: https://stackoverflow.com/questions/42297169/post-function-to-webworker
    return this;
  },
};

function YPromise(callback) {
  this.callback = callback;
  // this.worker = new Worker(__filename);
  // this.worker.on('message', (fct) => { fct(); });
}

YPromise.yresolve = function yresolve(value) {
  return new this((resFct) => resFct(value));
};

YPromise.yall = async function yall(arrayProms) {
  const result = [];
  for (let index = 0; index < arrayProms.length; index += 1) {
    const promise = arrayProms[index];
    if (promise instanceof YPromise) {
      // eslint-disable-next-line no-await-in-loop
      result.push(await promise);
      // console.log(result);
    } else {
      result.push(promise);
    }
  }
  return new Promise((resolve) => {
    resolve(result);
  });
};

Object.assign(YPromise.prototype, yPromiseProto);

module.exports = YPromise;
