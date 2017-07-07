/* eslint-disable */
const Regular = require('regularjs');
const language = require('../language');

Regular.prototype.$once = function (event, fn) {
  var call = function () {
    fn && fn.apply(this, arguments);
    this.$off(event, call);
  };
  this.$on(event, call);
};

const _ = {
  noop: Regular.util.noop,
  dom: Regular.dom,
  isNil(val) {
    return val == null || val == undefined;
  },
  /**
     * Check whether the object has the property.
     *
     * @param {Object} obj
     * @param {String} key
     * @return {Boolean}
     */
  hasOwn(obj, key) {
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    return hasOwnProperty.call(obj, key);
  },
  multiline(func) {
    const reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
    return reg.exec(func)[1];
  },
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
};

_.throttle = function (fn, delay) {
  let timer = null;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
_.debounce = function (func, wait, immediate) {
  let timeout,
    args,
    context,
    timestamp,
    result;

  var later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

/**
 * 压缩regular模版
 * @param htmlstr
 * @returns {XML|string}
 * add by xuejimiao 2016/02/25
 */
_.compressHtml = function (htmlstr) {
  // 防止nej打包模版后报错
  if (typeof htmlstr !== 'string') {
    return htmlstr;
  }
  let htmlStrArrs,
    onHTML = false,
    onRegularExpression = false;
  htmlStrArrs = htmlstr.split('');
  return htmlStrArrs
    .map((item) => {
      if (item == '<') {
        onHTML = true;
      } else if (item == '>') {
        onHTML = false;
        return item;
      } else if (item == '{') {
        onRegularExpression = true;
      } else if (item == '}') {
        onRegularExpression = false;
        return item;
      }

      if (onHTML || onRegularExpression || !/[\n\s]/g.test(item)) {
        return item;
      }
    })
    .join('');
};

_.extend = function (o1, o2, override, hasOwnProperty) {
  for (const i in o2) {
    if (
      (!hasOwnProperty || o2.hasOwnProperty(i)) &&
      (override || o1[i] === undefined)
    ) {
      o1[i] = o2[i];
    }
  }
  return o1;
};

_.dom.emit = function (elem, eventName) {
  if (elem.dispatchEvent) {
    var event = new CustomEvent(eventName);
    elem.dispatchEvent(event);
  } else {
    var event = document.createEventObject();
    elem.fireEvent(`on${eventName}`, event);
  }
};

_.dom.getPosition = function (elem) {
  let doc = elem && elem.ownerDocument,
    docElem = doc.documentElement,
    body = doc.body;

  const box = elem.getBoundingClientRect
    ? elem.getBoundingClientRect()
    : { top: 0, left: 0 };

  let clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0;

  return { top: box.top - clientTop, left: box.left - clientLeft };

  // var scrollTop = window.pageYOffset || docElem.scrollTop,
  //     scrollLeft = window.pageXOffset || docElem.scrollLeft;

  // return {top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft}
};

_.dom.getOffset = function (elem) {
  return { width: elem.clientWidth, height: elem.clientHeight };
};

_.dom.getDimension = function (elem, fixed) {
  return _.extend(_.dom.getOffset(elem), _.dom.getPosition(elem, fixed));
};

_.dom.isInRect = function (position, dimension) {
  if (!position || !dimension) return false;

  return (
    position.left > dimension.left &&
    position.left < dimension.left + dimension.width &&
    position.top > dimension.top &&
    position.top < dimension.top + dimension.height
  );
};

_.dom.once = function (elem, ev, handle) {
  function real() {
    handle.apply(this, arguments);
    _.dom.off(elem, ev, real);
  }
  _.dom.on(elem, ev, real);
};

_.dom.contains = function (root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};

// Ref: http://jsfiddle.net/mendesjuan/rHMCy/4/
_.dom.fireEvent = function (node, eventName) {
  // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
  let doc;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  } else if (node.nodeType == 9) {
    // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
    doc = node;
  } else {
    throw new Error(`Invalid node passed to fireEvent: ${node.id}`);
  }

  if (node.dispatchEvent) {
    // Gecko-style approach (now the standard) takes more work
    let eventClass = '';

    // Different events have different event classes.
    // If this switch statement can't map an eventName to an eventClass,
    // the event firing is going to fail.
    switch (eventName) {
      case 'click': // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
      case 'mousedown':
      case 'mouseup':
        eventClass = 'MouseEvents';
        break;

      case 'focus':
      case 'change':
      case 'blur':
      case 'select':
        eventClass = 'HTMLEvents';
        break;

      default:
        throw `fireEvent: Couldn't find an event class for event '${eventName}'.`;
        break;
    }
    var event = doc.createEvent(eventClass);

    const bubbles = eventName != 'change';
    event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

    event.synthetic = true; // allow detection of synthetic events
    node.dispatchEvent(event, true);
  } else if (node.fireEvent) {
    // IE-old school style
    var event = doc.createEventObject();
    event.synthetic = true; // allow detection of synthetic events
    node.fireEvent(`on${eventName}`, event);
  }
};

_.$trans = function (key, self) {
  const $JRUI = window.$JRUI || {};
  return (
    language[$JRUI.lang || (self ? self.data.lang : '') || 'zh-CN'][key] || ''
  );
};

module.exports = _;
