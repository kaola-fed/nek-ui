const _ = require('../../../ui-base/_');

const defaults = {
  type: 'POST',
  async: true,
};

function upload(url, src, options) {
  const fd = new FormData();
  let data = src;
  let name = options.name || 'file';

  if (src instanceof File) {
    data[name] = src;
  }

  for (let key in data) {
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

  for (let key in headers) {
    if (headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  const noop = function () {};
  const onerror = options.onerror || noop;
  const onDownloadLoad = options.onload || noop;
  const onDownloadProgress = options.onprogress || noop;

  xhr.addEventListener('load', onDownloadLoad);
  xhr.addEventListener('error', onerror);
  xhr.addEventListener('progress', onDownloadProgress);

  if (options.upload) {
    const onUploadLoad = options.upload.onload || noop;
    const onUploadProgress = options.upload.onprogress || noop;

    xhr.upload.addEventListener('load', onUploadLoad);
    xhr.upload.addEventListener('progress', onUploadProgress);
  }

  xhr.send(options.data);
}

module.exports = upload;
