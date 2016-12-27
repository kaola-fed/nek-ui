'use strict';

var Regular = require('regularjs');

Regular.prototype.$once = function(event, fn) {
    var call = function() {
        fn && fn.apply(this, arguments);
        this.$off(event, call);
    }
    this.$on(event, call);
}

var _ = {
    noop: Regular.util.noop,
    dom: Regular.dom,
    multiline: function(func) {
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    },
}

_.throttle = function(fn, delay) {
  var timer = null;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn();
    }, delay);
  }
}

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
_.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    // 据上一次触发时间间隔
    var last = +new Date() - timestamp;

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

  return function() {
    context = this;
    args = arguments;
    timestamp = +new Date();
    var callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

_.extend = function(o1, o2, override, hasOwnProperty) {
    for(var i in o2)
        if((!hasOwnProperty || o2.hasOwnProperty(i)) && (override || o1[i] === undefined))
            o1[i] = o2[i]
    return o1;
}

_.dom.emit = function(elem, eventName, data) {
    if(elem.dispatchEvent) {
        var event = new CustomEvent(eventName, {detail: data});
        elem.dispatchEvent(event);
    } else {
        var event = document.createEventObject();
        event.detail = data;
        elem.fireEvent('on' + eventName, event);
    }
}

_.dom.getPosition = function(elem) {
    var doc = elem && elem.ownerDocument,
        docElem = doc.documentElement,
        body = doc.body;

    var box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : { top: 0, left: 0 };

    var clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0;

    return {top: box.top - clientTop, left: box.left - clientLeft};

    // var scrollTop = window.pageYOffset || docElem.scrollTop,
    //     scrollLeft = window.pageXOffset || docElem.scrollLeft;

    // return {top: box.top + scrollTop - clientTop, left: box.left + scrollLeft - clientLeft}
}

_.dom.getOffset = function(elem) {
    return {width: elem.clientWidth, height: elem.clientHeight}
}

_.dom.getDimension = function(elem, fixed) {
    return _.extend(_.dom.getOffset(elem), _.dom.getPosition(elem, fixed));
}

_.dom.isInRect = function(position, dimension) {
    if(!position || !dimension) return false;

    return position.left > dimension.left
        && (position.left < dimension.left + dimension.width)
        && position.top > dimension.top
        && (position.top < dimension.top + dimension.height);
}

_.dom.once = function(elem, ev, handle) {
    function real() {
        handle.apply(this, arguments);
        _.dom.off(elem, ev, real);
    }
    _.dom.on(elem, ev, real);
}

_.dom.contains = function(root, n) {
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

module.exports = _;