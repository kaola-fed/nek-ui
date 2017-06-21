'use strict';

var _ = require('../utils');

var tplMap = {
    default: require('./templates/default.html'),
    progress: require('./templates/progress.html'),
    check: require('./templates/check.html')
};

exports.get = function getTemplate(type) {
    return _.convertBeginEnd(tplMap[type] || tplMap.default);
};

