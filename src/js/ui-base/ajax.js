const reqwest = require('reqwest');

const ajax = {};
// var eventEmitter = new require('events').EventEmitter();
// var ajax = {
//     $on: eventEmitter.on,
//     $off: eventEmitter.removeListener,
//     $emit: eventEmitter.emit
// };

// var Notify = require('../module/notify.js');

ajax.request = function (opt) {
  let oldError = opt.error,
    oldSuccess = opt.success,
    oldComplete = opt.complete;

  opt.data = opt.data || {};

  opt.type = opt.type || 'json';

  if (!opt.contentType && opt.method && opt.method.toLowerCase() !== 'get') {
    opt.contentType = 'application/json';
  }

  if (opt.contentType === 'application/json') {
    opt.data = JSON.stringify(opt.data);
  }

  // ajax.$emit('start', opt);
  opt.success = function (data) {
    // ajax.$emit('success', data);
    if (data.code || data.success) {
      if (data.code != 200 && !data.success) {
        if (oldError) oldError(data.error, data.message, data.code);
        else; // Notify.error(data.message);
      } else oldSuccess && oldSuccess(data, data.message, data.code);
    } else oldSuccess && oldSuccess(data);
  };

  opt.error = function (data) {
    // ajax.$emit('error', data);
    oldError && oldError(data.result, data);
  };

  opt.complete = function (data) {
    // ajax.$emit('complete', data);
    oldComplete && oldComplete(data.result, data);
  };

  reqwest(opt);
};

ajax.get = function (url, success, error) {
  ajax.request({
    url,
    method: 'get',
    success,
    error,
  });
};

ajax.post = function (url, data, success, error) {
  ajax.request({
    url,
    method: 'post',
    type: 'json',
    success,
    error,
  });
};

module.exports = ajax;
