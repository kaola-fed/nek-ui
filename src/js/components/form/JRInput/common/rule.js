const _ = require('../../../../ui-base/_');

function stringBytes(c) {
  const n = c.length;
  let len = 0;
  for (let i = 0; i < n; i += 1) {
    let s = c.charCodeAt(i);
    while (s > 0) {
      len += 1;
      /* eslint no-bitwise: 0 */
      s >>= 8;
    }
  }
  return len;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
  required: { type: 'isRequired', message: _.$trans('PLEASE_INPUT') },
  isEmail: { type: 'isEmail', message: _.$trans('FORMAT_ERROR') },
  isURL: { type: 'isURL', message: _.$trans('FORMAT_ERROR') },
  isInt(_min, _max, message) {
    let min = _min;
    let max = _max;
    min = isNumeric(min) ? min / 1 : -Infinity;
    max = isNumeric(max) ? max / 1 : Infinity;
    return {
      type: 'isInt',
      message: message || _.$trans('VALUE_ERROR'),
      options: { min, max },
    };
  },
  isFloat(_min, _max, message) {
    let min = _min;
    let max = _max;
    min = isNumeric(min) ? min / 1 : -Infinity;
    max = isNumeric(max) ? max / 1 : Infinity;
    return {
      type: 'isFloat',
      message: message || _.$trans('VALUE_ERROR'),
      options: { min, max },
    };
  },
  byteLen(_min, _max, message) {
    let min = _min;
    let max = _max;
    min = isNumeric(min) ? min / 1 : 0;
    max = isNumeric(max) ? max / 1 : Infinity;
    return {
      message: message || _.$trans('LENGTH_ERROR'),
      method(value = '') {
        const len = stringBytes(value);
        return len >= min && len <= max;
      },
    };
  },
};
