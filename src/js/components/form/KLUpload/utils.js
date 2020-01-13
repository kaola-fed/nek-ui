const _ = require('../../../ui-base/_');

function genUid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function camelize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const defaults = {
  type: 'POST',
  async: true,
};

function upload(url, rawFile, options) {
  const data = createFormData(rawFile, options);
  _.extend(options, { url, data }, true);

  return ajax(_.extend(defaults, options, true));
}

function createFormData(rawFile, options = {}) {
  const fd = new FormData();
  let data = rawFile;
  const name = options.name;
  if (rawFile instanceof File) {
    data = {};
    data[name] = rawFile;
  }
  _.extend(data, options.data);
  for (const [key, value] of Object.entries(data)) {
    fd.append(key, value);
  }
  return fd;
}

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return (match ? decodeURIComponent(match[3]) : null);
}

function ajax(options) {
  const xhr = new XMLHttpRequest();
  const headers = options.headers || {};
  _.extend(headers, {
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': readCookie('XSRF-TOKEN') || '',
  });

  xhr.open(options.type, options.url, options.async);

  let key;
  for (key in headers) {
    if (headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  xhr.withCredentials = options.withCredentials;

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

module.exports = {
  upload,
  genUid,
  camelize,
  createFormData,
};
