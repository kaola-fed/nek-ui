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
  let timer = null;
  const delay = _delay || 100;
  return function (...args) {
    const now = +new Date();

    clearTimeout(timer);
    if (now - last > delay) {
      last = now;
      fn.apply(self, args);
    } else {
      // run at last time
      timer = setTimeout(() => {
        fn.apply(self, args);
      }, delay);
    }
  };
};

/*eslint-disable*/
_.debounce = function(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    let last = (+new Date()) - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function () {
    context = this;
    args = arguments; // eslint-disable-line
    timestamp = (+new Date());
    let callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
/*eslint-enable*/

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

const updateHeaderSpan = function (headers) {
  const len = headers.length;
  headers.forEach((row, rowIndex) => {
    row.forEach((header) => {
      header._headerColSpan = header._nodeWidth;
      header._headerRowSpan = len - rowIndex - (header._nodeDepth - 1);
    });
  });
  return headers;
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
        column._nodeDepth =
          1 +
          column.children.reduce(
            (previous, current) => (
              current._nodeDepth > previous
                ? current._nodeDepth
                : previous
            ),
            0,
          );
        column._nodeWidth = column.children.reduce(
          (previous, current) => previous + (current._nodeWidth || 0),
          0,
        );
      } else {
        column._nodeDepth = 1;
        column._nodeWidth = 1;
      }
      headers[depth].push(column);
    });
  };
  extractHeaders(_columns, 0);
  return updateHeaderSpan(headers);
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
