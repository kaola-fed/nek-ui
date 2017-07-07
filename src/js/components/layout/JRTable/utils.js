const Regular = require('regularjs');

const _ = {};

_.isType = function (target, type) {
  return (
    Object.prototype.toString.call(target).toLowerCase() === `[object ${type}]`
  );
};
['String', 'Object', 'Array', 'Number', 'Null', 'Undefined'].forEach((item) => {
  _[`is${item}`] = function (target) {
    return _.isType(target, item.toLowerCase());
  };
});

_.fillWithZero = function (val, len) {
  const valLen = val.toString().length;
  if (valLen < len) {
    return (Array(len).join(0) + val).slice(-len);
  }
  return `${val}`;
};

_.throttle = function (fn, _delay) {
  const self = this;
  let last = null;
  const timer = null;
  const delay = _delay || 100;
  return function (...args) {
    const now = +new Date();

    clearTimeout(timer);
    if (now - last > delay) {
      last = now;
      fn.apply(self, args);
    } else {
      // run at last time
      setTimeout(() => {
        fn.apply(self, args);
      }, delay);
    }
  };
};

_.convertBeginEnd = function (_str) {
  const BEGIN = Regular._BEGIN_;
  const END = Regular._END_;
  let str = `${_str}`;
  if (BEGIN && BEGIN !== '{') {
    str = str.replace(/{/g, BEGIN);
  }
  if (END && END !== '}') {
    str = str.replace(/}/g, END);
  }
  return str;
};

const hasChildren = function (root) {
  return root.children && root.children.length > 0;
};

_.getHeaders = function (_columns) {
  const headers = [];
  const extractHeaders = function (columns, depth) {
    columns.forEach((column) => {
      if (hasChildren(column)) {
        column._dataColumn = extractHeaders(column.children, depth + 1);
      }
      if (!headers[depth]) {
        headers[depth] = [];
      }
      // 计算深度和宽度
      if (hasChildren(column)) {
        column.childrenDepth =
          1 +
          column.children.reduce(
            (previous, current) => (
              current.childrenDepth > previous
                ? current.childrenDepth
                : previous
            ),
            -1,
          );
        column.headerColSpan = column.children.reduce(
          (previous, current) => previous + (current.headerColSpan || 0),
          0,
        );
      } else {
        column.childrenDepth = 0;
        column.headerColSpan = 1;
      }
      headers[depth].push(column);
    });
  };
  extractHeaders(_columns, 0);
  return headers;
};

_.getLeaves = function (tree) {
  const res = [];
  const extractLeaves = function (root) {
    if (root.forEach) {
      return root.forEach((item) => {
        if (hasChildren(item)) {
          extractLeaves(item.children);
        } else {
          res.push(item);
        }
      });
    }
  };
  extractLeaves(tree);
  return res;
};

const getNum = function (str) {
  return +`${str}`.split('px')[0];
};

_.getNum = getNum;

_.setElementValue = function (ele, prop, val) {
  if (ele) {
    ele[prop] = val;
  }
};

_.getElementHeight = function (ele) {
  const computedStyle = window.getComputedStyle(ele);
  const height =
    getNum(computedStyle.marginTop) +
    getNum(computedStyle.borderTopWidth) +
    getNum(ele.offsetHeight) +
    getNum(computedStyle.borderBottomWidth) +
    getNum(computedStyle.marginBottom);
  return height;
};

module.exports = _;
