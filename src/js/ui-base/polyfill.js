const bowser = require('bowser');

if (!Object.keys) {
  Object.keys = (function () {
    let hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor',
      ],
      dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (
        typeof obj !== 'object' &&
        (typeof obj !== 'function' || obj === null)
      ) {
        throw new TypeError('Object.keys called on non-object');
      }
      let result = [],
        prop,
        i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

if (typeof Object.create !== 'function') {
  Object.create = (function () {
    function Temp() {}
    const hasOwn = Object.prototype.hasOwnProperty;
    return function (O) {
      if (typeof O !== 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }
      Temp.prototype = O;
      const obj = new Temp();
      Temp.prototype = null;
      if (arguments.length > 1) {
        const Properties = Object(arguments[1]);
        for (const prop in Properties) {
          if (hasOwn.call(Properties, prop)) obj[prop] = Properties[prop];
        }
      }
      return obj;
    };
  }());
}

if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    let T,
      A,
      k;
    if (this == null) throw new TypeError('This is null or not defined');
    const O = Object(this);
    const len = O.length >>> 0;
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }
    if (arguments.length > 1) T = thisArg;
    A = new Array(len);
    k = 0;
    while (k < len) {
      var kValue,
        mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const list = Object(this);
    const length = list.length >>> 0;
    const thisArg = arguments[1];
    let value;
    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) return value;
    }
  };
}

if (bowser.msie && bowser.version <= 8) {
  let splitSolved;
  splitSolved =
    splitSolved ||
    (function (undef) {
      let nativeSplit = String.prototype.split,
        compliantExecNpcg = /()??/.exec('')[1] === undef, // NPCG: nonparticipating capturing group
        self;

      self = function (str, separator, limit) {
        // If `separator` is not a regex, use `nativeSplit`
        if (Object.prototype.toString.call(separator) !== '[object RegExp]') {
          return nativeSplit.call(str, separator, limit);
        }
        var output = [],
          flags =
            (separator.ignoreCase ? 'i' : '') +
            (separator.multiline ? 'm' : '') +
            (separator.extended ? 'x' : '') + // Proposed for ES6
            (separator.sticky ? 'y' : ''), // Firefox 3+
          lastLastIndex = 0,
          // Make `global` and avoid `lastIndex` issues by working with a copy
          separator = new RegExp(separator.source, `${flags}g`),
          separator2,
          match,
          lastIndex,
          lastLength;
        str += ''; // Type-convert
        if (!compliantExecNpcg) {
          // Doesn't need flags gy, but they don't hurt
          separator2 = new RegExp(`^${separator.source}$(?!\\s)`, flags);
        }
        /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
        limit =
          limit === undef
            ? -1 >>> 0 // Math.pow(2, 32) - 1
            : limit >>> 0; // ToUint32(limit)
        while ((match = separator.exec(str))) {
          // `separator.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for
            // nonparticipating capturing groups
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (let i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undef) {
                    match[i] = undef;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++; // Avoid an infinite loop
          }
        }
        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test('')) {
            output.push('');
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };

      // For convenience
      String.prototype.split = function (separator, limit) {
        return self(this, separator, limit);
      };

      return self;
    }());
}

exports.StringDate = function (value) {
  if (!value) return new Date();
  value = value.split(' ');
  const date = value[0].split('-');
  const time = value[1] ? value[1].split(':') : [];

  return new Date(
    date[0],
    date[1] - 1,
    date[2],
    time[0] || 0,
    time[1] || 0,
    time[2] || 0,
  );
};
