var _ = require('../../../ui-base/_');

var defaults = {
    type: 'POST',
    async: true
};

function upload(url, data, options) {
    var fd = new FormData();
    
    if (data instanceof File) {
        data = {
            file: data
        };
    }

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            fd.append(key, data[key]);
        }
    }
    
    options.url = url;
    options.data = fd;
    options = _.extend(defaults, options, true);
    
    return ajax(options);
}

function ajax(options) {
    var xhr = new XMLHttpRequest(),
        headers = options.headers || {};
    
    xhr.open(options.type, options.url, options.async);
    
    for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    var noop = function() {};
    var onerror = options.onerror || noop;
    
    var onload = options.onload || noop;
    
    var onprogress = options.onprogress || noop;
    
    xhr.addEventListener('load', onload);
    xhr.addEventListener('error', onerror);
    xhr.addEventListener('progress', onprogress);
    
    if (options.upload) {
        var onuploadLoad = options.upload.onload || noop;

        var onuploadProgress = options.upload.onprogress || noop;

        xhr.upload.addEventListener('load', onuploadLoad);
        xhr.upload.addEventListener('progress', onuploadProgress);
    }
    
    xhr.send(options.data);
}

module.exports = upload;