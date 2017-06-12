'use strict';

var tplMap = {
    default: require('./templates/default.html')
};

exports.get = function getTemplate(type) {
    return tplMap[type] || tplMap.default;
};

