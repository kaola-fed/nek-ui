const _ = require('../../../ui-base/_');

const defaults = {
  type: 'POST',
  async: true,
};

function upload(url, src, options) {
  const fd = new FormData();
  let data = src;

  if (src instanceof File) {
    data = {
      file: src,
    };
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      fd.append(key, data[key]);
    }
  }

  options.url = url;
  options.data = fd;

  return ajax(_.extend(defaults, options, true));
}

function ajax(options) {
  const xhr = new XMLHttpRequest();
  const headers = options.headers || {};

  xhr.open(options.type, options.url, options.async);

  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  const noop = function () {};
  const onerror = options.onerror || noop;

  const onload = options.onload || noop;

  const onprogress = options.onprogress || noop;

  xhr.addEventListener('load', onload);
  xhr.addEventListener('error', onerror);
  xhr.addEventListener('progress', onprogress);

  if (options.upload) {
    const onuploadLoad = options.upload.onload || noop;

    const onuploadProgress = options.upload.onprogress || noop;

    xhr.upload.addEventListener('load', onuploadLoad);
    xhr.upload.addEventListener('progress', onuploadProgress);
  }

  xhr.send(options.data);
}

module.exports = upload;
