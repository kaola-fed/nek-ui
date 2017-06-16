'use strict';

var _ = require('../utils');

var tplMap = {
    default: require('./templates/default.html')
};

exports.get = function getTemplate(type) {
    return _.convertBeginEnd(tplMap[type] || tplMap.default);
};

