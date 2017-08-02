const _ = require('../utils');

const tplMap = {
  default: require('./templates/check.html'),
};

exports.get = function getTemplate(type) {
  return _.convertBeginEnd(tplMap[type] || '');
};
