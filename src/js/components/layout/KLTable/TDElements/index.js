const _ = require('../utils');

const tplMap = {
  progress: require('./templates/progress.html'),
  check: require('./templates/check.html'),
};

exports.get = function getTemplate(type) {
  return _.convertBeginEnd(tplMap[type] || '');
};
