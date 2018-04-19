(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("regularjs"));
	else if(typeof define === 'function' && define.amd)
		define(["Regular"], factory);
	else if(typeof exports === 'object')
		exports["UXUI"] = factory(require("regularjs"));
	else
		root["UXUI"] = factory(root["Regular"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_19__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(25)('wks');
var uid = __webpack_require__(17);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(36);
var defined = __webpack_require__(22);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(33);
var toPrimitive = __webpack_require__(20);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(35);
var enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(72);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var Regular = __webpack_require__(19);

Regular.prototype.$once = function (event, fn) {
    var call = function call() {
        fn && fn.apply(this, arguments);
        this.$off(event, call);
    };
    this.$on(event, call);
};

var _ = {
    noop: Regular.util.noop,
    dom: Regular.dom,
    isNil: function isNil(val) {
        return val == null || val == undefined;
    },

    /**
     * Check whether the object has the property.
     *
     * @param {Object} obj
     * @param {String} key
     * @return {Boolean}
     */
    hasOwn: function hasOwn(obj, key) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        return hasOwnProperty.call(obj, key);
    },
    multiline: function multiline(func) {
        var reg = /^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/;
        return reg.exec(func)[1];
    },
    clone: function clone(obj) {
        return JSON.parse((0, _stringify2.default)(obj));
    }
};

_.throttle = function (fn, delay) {
    var timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
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
    var timeout = void 0,
        args = void 0,
        context = void 0,
        timestamp = void 0,
        result = void 0;

    var later = function later() {
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

    return function () {
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
    var htmlStrArrs = void 0,
        onHTML = false,
        onRegularExpression = false;
    htmlStrArrs = htmlstr.split('');
    return htmlStrArrs.map(function (item) {
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
    }).join('');
};

_.extend = function (o1, o2, override, hasOwnProperty) {
    for (var i in o2) {
        if ((!hasOwnProperty || o2.hasOwnProperty(i)) && (override || o1[i] === undefined)) {
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
        elem.fireEvent('on' + eventName, event);
    }
};

_.dom.getPosition = function (elem) {
    var doc = elem && elem.ownerDocument,
        docElem = doc.documentElement,
        body = doc.body;

    var box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : { top: 0, left: 0 };

    var clientTop = docElem.clientTop || body.clientTop || 0,
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

    return position.left > dimension.left && position.left < dimension.left + dimension.width && position.top > dimension.top && position.top < dimension.top + dimension.height;
};

_.dom.once = function (elem, ev, handle) {
    function real() {
        handle.apply(this, arguments);
        _.dom.off(elem, ev, real);
    }
    _.dom.on(elem, ev, real);
};

_.dom.contains = function (root, n) {
    var node = n;
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
    var doc = void 0;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9) {
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error('Invalid node passed to fireEvent: ' + node.id);
    }

    if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = '';

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
                throw 'fireEvent: Couldn\'t find an event class for event \'' + eventName + '\'.';
                break;
        }
        var event = doc.createEvent(eventClass);

        var bubbles = eventName != 'change';
        event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        node.dispatchEvent(event, true);
    } else if (node.fireEvent) {
        // IE-old school style
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent('on' + eventName, event);
    }
};

module.exports = _;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(50);
var hide = __webpack_require__(5);
var has = __webpack_require__(3);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(42);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Regular = __webpack_require__(19);
var _ = __webpack_require__(10);
var filter = __webpack_require__(74);
var directive = __webpack_require__(79);
var animation = __webpack_require__(94);

var Component = Regular.extend({
  /**
   * @protected
   */
  config: function config() {
    _.extend(this.data, {
      readonly: false,
      disabled: false,
      visible: true,
      class: '',
      console: typeof console === 'undefined' ? undefined : console
    });
    this.supr();
  },

  /**
   * @protected
   */
  defaults: function defaults(data) {
    this.data = (0, _assign2.default)(data, this.data);
  },

  /**
   * @protected
   */
  rules: function rules(attris) {
    this.data = (0, _assign2.default)(attris, this.data);
  },

  /**
   * @protected
   */
  reset: function reset() {
    this.data = {};
    this.config();
  },
  $trans: function $trans(key) {
    return _.$trans(key, this);
  }
}).filter(filter).directive(directive);

animation.install(Regular);

module.exports = Component;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys');
var uid = __webpack_require__(17);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(3);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(27);
var wksExt = __webpack_require__(31);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(3);
var toIObject = __webpack_require__(4);
var arrayIndexOf = __webpack_require__(53)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
var global = __webpack_require__(1);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(18);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(27);
var $export = __webpack_require__(11);
var redefine = __webpack_require__(39);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(61);
var setToStringTag = __webpack_require__(28);
var getPrototypeOf = __webpack_require__(64);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(12);
var dPs = __webpack_require__(62);
var enumBugKeys = __webpack_require__(26);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(34)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(63).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(65)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(35);
var hiddenKeys = __webpack_require__(26).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * ------------------------------------------------------------
 * @file KLCard 卡片
 * @author zianecui@gmail.com
 * ------------------------------------------------------------
 */

var Component = __webpack_require__(15);
var template = __webpack_require__(95);
var _ = __webpack_require__(10);

/**
 * @class KLCard
 * @extend Component
 * @param {object}          [options.data]                        = 绑定属性
 * @param {string}          [options.data.class]                  => 补充class
 * @param {boolean}          [options.data.isShowLine]            => 控制展示title之前的竖线，默认展示出来
 * @param {boolean}          [options.data.isShowBtLine]          => 控制展示title下发的横线，默认不展示出来
 * @param {boolean}          [options.data.isIndent]              => 控制子模块的title是否缩进
 */
var KLCard = Component.extend({
  name: 'kl-card',
  template: template,
  $tools: null,
  config: function config() {
    _.extend(this.data, {
      title: '',
      isShowLine: true,
      isShowBtLine: false,
      isIndent: true
    });
    this.supr();
  }
});

module.exports = KLCard;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Component = __webpack_require__(15);
var template = __webpack_require__(99);
var _ = __webpack_require__(10);

var UXModal = Component.extend({
  name: 'ux-modal',
  template: template,
  config: function config() {
    _.extend(this.data, {
      title: null,
      content: '',
      okButton: true,
      with: 400,
      cancelButton: false,
      noClose: false,
      okDisabled: false,
      cancelDisabled: false,
      hasFooter: true,
      isCanClose: true
    });
    this.supr();
  },
  init: function init() {
    this.supr();

    // 如果不是内嵌组件，则嵌入到document.body中
    if (this.$root === this) this.$inject(document.body);
  },
  close: function close(result, event) {
    this.$emit('close', {
      result: result
    });
    result ? this.ok(event) : this.cancel();
  },
  ok: function ok(event) {
    this.$emit('ok', event);
    !this.data.noClose && this.destroy();
  },
  cancel: function cancel() {
    this.$emit('cancel');
    this.destroy();
  }
});

module.exports = UXModal;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _values = __webpack_require__(47);

var _values2 = _interopRequireDefault(_values);

var _getIterator2 = __webpack_require__(56);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = __webpack_require__(42);

var _assign2 = _interopRequireDefault(_assign);

var _regularjs = __webpack_require__(19);

var _regularjs2 = _interopRequireDefault(_regularjs);

var _component = __webpack_require__(15);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = {
  Regular: _regularjs2.default,
  Component: _component2.default
};

var Components = {
  // Layout
  KLCard: __webpack_require__(44),
  KLCardTools: __webpack_require__(96),
  UXImage: __webpack_require__(97),
  UXModal: __webpack_require__(45)
};

module.exports = (0, _assign2.default)({
  // Register
  /* eslint no-shadow: 0 */
  install: function install(Regular) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)((0, _values2.default)(Components)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var m = _step.value;

        var name = m.prototype && m.prototype.name;
        if (name) Regular.component(name, m);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}, Base, Components);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(0).Object.values;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(11);
var $values = __webpack_require__(52)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(51);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(9);
var toIObject = __webpack_require__(4);
var isEnum = __webpack_require__(14).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(4);
var toLength = __webpack_require__(54);
var toAbsoluteIndex = __webpack_require__(55);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
__webpack_require__(41);
module.exports = __webpack_require__(66);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(59);
var step = __webpack_require__(60);
var Iterators = __webpack_require__(18);
var toIObject = __webpack_require__(4);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(40);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(28);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(12);
var getKeys = __webpack_require__(9);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(3);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var defined = __webpack_require__(22);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(12);
var get = __webpack_require__(67);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(68);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(18);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(11);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(71) });


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(9);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(14);
var toObject = __webpack_require__(29);
var IObject = __webpack_require__(36);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(8)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(75);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.format = function () {
  function fix(_str) {
    var str = '' + (String(_str) || '');
    return str.length <= 1 ? '0' + str : str;
  }

  var maps = {
    yyyy: function yyyy(date) {
      return date.getFullYear();
    },
    MM: function MM(date) {
      return fix(date.getMonth() + 1);
    },
    dd: function dd(date) {
      return fix(date.getDate());
    },
    HH: function HH(date) {
      return fix(date.getHours());
    },
    mm: function mm(date) {
      return fix(date.getMinutes());
    },
    ss: function ss(date) {
      return fix(date.getSeconds());
    }
  };

  var trunk = new RegExp((0, _keys2.default)(maps).join('|'), 'g');
  return function (_value, _format) {
    if (!_value) {
      return '';
    }
    var format = _format || 'yyyy-MM-dd HH:mm';
    var value = new Date(_value);

    return format.replace(trunk, function (capture) {
      return maps[capture] ? maps[capture](value) : '';
    });
  };
}();

exports.average = function (_array, key) {
  var array = _array || [];
  return array.length ? exports.total(array, key) / array.length : 0;
};
exports.total = function (array, key) {
  var total = 0;
  if (!array) return undefined;
  array.forEach(function (item) {
    total += key ? item[key] : item;
  });
  return total;
};

exports.filter = function (array, filterFn) {
  if (!array || !array.length) return undefined;
  return array.filter(function (item, index) {
    return filterFn(item, index);
  });
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(29);
var $keys = __webpack_require__(9);

__webpack_require__(78)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(11);
var core = __webpack_require__(0);
var fails = __webpack_require__(8);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(80);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = __webpack_require__(10);
var Regular = __webpack_require__(19);

var rClassGenerator = function rClassGenerator(rClass) {
  exports[rClass] = function (elem, value) {
    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value.type === 'expression') {
      this.$watch(value, function (newValue) {
        _.dom[newValue ? 'addClass' : 'delClass'](elem, rClass);
      });
    } else if (!!value || value === '') _.dom.addClass(elem, rClass);
  };
};

rClassGenerator('z-crt');
rClassGenerator('z-sel');
rClassGenerator('z-chk');
rClassGenerator('z-act');
rClassGenerator('z-dis');
rClassGenerator('z-hover');
rClassGenerator('z-divider');

exports['r-show'] = function (elem, value) {
  if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value.type === 'expression') {
    this.$watch(value, function (newValue, oldValue) {
      if (!newValue === !oldValue) return;

      if (typeof newValue === 'string') elem.style.display = newValue;else elem.style.display = newValue ? 'block' : '';
    });
  } else if (!!value || value === '') {
    if (typeof value === 'string' && value !== '') elem.style.display = value;else elem.style.display = value ? 'block' : '';
  }
};

exports['r-autofocus'] = function (elem) {
  setTimeout(function () {
    elem.focus();
  }, 0);
};

exports['r-attr'] = function (elem, value) {
  var attrs = {
    INPUT: ['autocomplete', 'autofocus', 'checked', 'disabled', 'max', 'maxlength', 'min', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'step', 'type'],
    TEXTAREA: ['autofocus', 'disabled', 'maxlength', 'name', 'placeholder', 'readonly', 'required', 'wrap'],
    SELECT: ['autofocus', 'disabled', 'multiple', 'name', 'required']
  };

  this.$watch(value, function (newValue) {
    attrs[elem.tagName].forEach(function (attr) {
      if (newValue[attr]) _.dom.attr(elem, attr, newValue[attr]);
    });
  }, true);
};

/**
 * r-width form.item下表单元素固定宽度时使用;
 * @param elem
 * @param value
 */
exports['r-width'] = function (elem, value) {
  this.$watch(value, function (newValue) {
    if (parseInt(newValue)) {
      elem.style.width = parseInt(newValue) + 'px';
      elem.style.display = 'inline-block';
    }
  });
};

/**
 * r-route kl-menu中使用, 支持单页跳转
 * @param elem
 */
exports['r-route'] = function (elem, value) {
  this.$watch(value, function () {
    var data = this.data;
    var url = data.url,
        route = data.route,
        rootMenu = data.rootMenu;
    var router = rootMenu.data.router;


    if (url) {
      elem.href = url;
    } else if (router && route) {
      Regular.directive('r-link').link.call(this, elem, route);
    }
  });
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(81);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(83);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(37);
module.exports = __webpack_require__(31).f('iterator');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
__webpack_require__(91);
__webpack_require__(92);
__webpack_require__(93);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(11);
var redefine = __webpack_require__(39);
var META = __webpack_require__(86).KEY;
var $fails = __webpack_require__(8);
var shared = __webpack_require__(25);
var setToStringTag = __webpack_require__(28);
var uid = __webpack_require__(17);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(31);
var wksDefine = __webpack_require__(32);
var enumKeys = __webpack_require__(87);
var isArray = __webpack_require__(88);
var anObject = __webpack_require__(12);
var isObject = __webpack_require__(13);
var toIObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(20);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(40);
var gOPNExt = __webpack_require__(89);
var $GOPD = __webpack_require__(90);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(9);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(43).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(14).f = $propertyIsEnumerable;
  __webpack_require__(30).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(27)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(5)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(17)('meta');
var isObject = __webpack_require__(13);
var has = __webpack_require__(3);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(8)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(9);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(14);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(4);
var gOPN = __webpack_require__(43).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(14);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(20);
var has = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(33);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {



/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('asyncIterator');


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('observable');


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  install: function install(Regular) {
    Regular.animation('collapse', function (step) {
      var param = step.param,
          el = step.element;

      var on = param === 'on';

      return function (done) {
        if (on) {
          // beforeEnter
          if (!el.dataset) el.dataset = {};

          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;

          el.style.height = '0';
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
          el.classList.add('collapse-transition');

          // enter
          el.dataset.oldOverflow = el.style.overflow;
          if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
          }

          el.style.overflow = 'hidden';

          // afterEnter
          el.addEventListener('transitionend', function () {
            el.classList.remove('collapse-transition');
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
            el.removeEventListener('transitionend', function () {});
            done();
          });
        } else {
          // beforeLeave
          if (!el.dataset) el.dataset = {};
          el.dataset.oldPaddingTop = el.style.paddingTop;
          el.dataset.oldPaddingBottom = el.style.paddingBottom;
          el.dataset.oldOverflow = el.style.overflow;

          el.style.height = el.scrollHeight + 'px';
          el.style.overflow = 'hidden';

          // leave
          if (el.scrollHeight !== 0) {
            // for safari: add class after set height,
            // or it will jump to zero height suddenly, weired
            el.classList.add('collapse-transition');
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
          }

          // afterLeave
          el.addEventListener('transitionend', function () {
            el.classList.remove('collapse-transition');
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
            el.removeEventListener('transitionend', function () {});
            done();
          });
        }
      };
    });
  }
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "<div class=\"m-card {class}\" r-class=\"{{'m-card-indent' : isIndent === true}}\">\n    {#if title || this.$tools}\n    <div class=\"card_hd\">\n        {#if isShowLine}\n        <span class=\"line\"></span>\n        {/if}\n        <span class=\"title\">{#inc title}</span>\n        {#if this.$tools}\n        <div class=\"operate\">\n            {#inc this.$tools.$body}\n        </div>\n        {/if}\n    </div>\n    {/if}\n    {#if isShowBtLine}\n    <div class=\"btLine\"></div>\n    {/if}\n    <div class=\"card_bd\">\n        {#inc this.$body}\n    </div>\n</div>"

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * ------------------------------------------------------------
 * KLCardTools     卡片组件上的操作区域
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

var Component = __webpack_require__(15);
var _ = __webpack_require__(10);
var KLCard = __webpack_require__(44);

/**
 * @class KLCardTools
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
var KLCardTools = Component.extend({
  name: 'kl-card-tools',
  /**
     * @protected
     */
  config: function config() {
    _.extend(this.data, {});
    this.supr();

    if (this.$outer && this.$outer instanceof KLCard) {
      this.$outer.$tools = this;
    }
  }
});

module.exports = KLCardTools;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(15);

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(98);

var _index2 = _interopRequireDefault(_index);

var _2 = __webpack_require__(10);

var _3 = _interopRequireDefault(_2);

var _ux = __webpack_require__(45);

var _ux2 = _interopRequireDefault(_ux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UXImage = _component2.default.extend({
  name: 'ux-image',
  template: _index2.default,
  config: function config() {
    _3.default.extend(this.data, {
      src: '',
      class: '',
      title: '事例',
      description: ''
    });
    this.supr();
  },
  viewImg: function viewImg() {
    /* eslint no-new: 0 */
    new _ux2.default({
      data: {
        okButton: false,
        hasFooter: false,
        contentTemplate: '<img class="ux-image-modal_image" src="' + this.data.src + '" alt="' + this.data.title + '">',
        class: 'ux-image-modal',
        title: this.data.title,
        width: 800
      }
    });
  }
});

module.exports = UXImage;

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ux-image {class}\">\n    <div class=\"ux-image_box\" on-click=\"{this.viewImg()}\">\n        <img class=\"ux-image_box_image\" src=\"{src}\" alt=\"{title}\">\n    </div>\n    <div class=\"ux-image_title\">{title}</div>\n    <div class=\"ux-image_description\">\n        {#inc description}\n    </div>\n</div>\n"

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = "<div class=\"m-modal {class}\" r-animation='on:leave;class: modal_animated modal_zoomOut'>\n    <div class=\"modal_dialog modal_animated zoomIn fast\" style=\"width: {width}px\" ref=\"modalDialog\">\n        <div class=\"modal_hd\">\n            {#if isCanClose}\n            <a class=\"modal_close\" on-click={this.close(false)}><i class=\"u-icon u-icon-remove\"></i></a>\n            {/if}\n            {#if title}\n            <h3 class=\"modal_title\">{title}</h3>\n            {/if}\n        </div>\n        <div class=\"modal_bd\" {#if maxHeight || minHeight} style=\"max-height: {maxHeight}px; min-height: {minHeight}px; overflow: auto;\" {/if}>\n        {#if contentTemplate}{#inc @(contentTemplate)}{#else}{content}{/if}\n    </div>\n    {#if hasFooter}\n    <div class=\"modal_ft\">\n        {#if footerTemplate}\n        {#inc @(footerTemplate)}\n        {#else}\n        {#if okButton}\n        <kl-button type=\"primary\" title={okButton === true ? this.$trans('CONFIRM') : okButton}on-click={this.close(true, $event)} disabled={okDisabled} />\n        {/if}\n        {#if cancelButton && isCanClose}\n        <kl-button title={cancelButton === true ? this.$trans('CANCEL') : cancelButton}\n        on-click={this.close(false)} disabled={cancelDisabled} />\n        {/if}\n        {/if}\n    </div>\n    {/if}\n</div>\n</div>\n"

/***/ })
/******/ ]);
});
//# sourceMappingURL=ux-ui.js.map