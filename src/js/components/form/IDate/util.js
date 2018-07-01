/* eslint-disable */

import dateUtil from './date';

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}

export const deepCopy = function (data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
};

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              return window.setTimeout(callback, 1000 / 60);
            }
        );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}

// firstUpperCase
export const firstUpperCase = function (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
};

export const toDate = function (date) {
  let _date = new Date(date);
    // IE patch start (#1422)
  if (isNaN(_date.getTime()) && typeof date === 'string') {
    _date = date.split('-').map(Number);
    _date[1] += 1;
    _date = new Date(..._date);
  }
    // IE patch end

  if (isNaN(_date.getTime())) return null;
  return _date;
};

export const clearHours = function (time) {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export const isInRange = (time, a, b) => {
  if (!a || !b) return false;
  const [start, end] = [a, b].sort();
  return time >= start && time <= end;
};

export const formatDate = function (date, format) {
  date = toDate(date);
  if (!date) return '';
  return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function (string, format) {
  return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const getDayCountOfMonth = function (year, month) {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = function (date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

export const siblingMonth = function (src, diff) {
  const temp = new Date(src); // lets copy it so we don't change the original
  const newMonth = temp.getMonth() + diff;
  const newMonthDayCount = getDayCountOfMonth(temp.getFullYear(), newMonth);
  if (newMonthDayCount < temp.getDate()) {
    temp.setDate(newMonthDayCount);
  }
  temp.setMonth(newMonth);

  return temp;
};

export const prevMonth = function (src) {
  return siblingMonth(src, -1);
};

export const nextMonth = function (src) {
  return siblingMonth(src, 1);
};

export const initTimeDate = function () {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};

export const formatDateLabels = (function () {
    /*
      Formats:
      yyyy - 4 digit year
      m - month, numeric, 1 - 12
      mm - month, numeric, 01 - 12
      mmm - month, 3 letters, as in `toLocaleDateString`
      Mmm - month, 3 letters, capitalize the return from `toLocaleDateString`
      mmmm - month, full name, as in `toLocaleDateString`
      Mmmm - month, full name, capitalize the return from `toLocaleDateString`
    */

  const formats = {
    yyyy: date => date.getFullYear(),
    m: date => date.getMonth() + 1,
    mm: date => (`0${date.getMonth() + 1}`).slice(-2),
    mmm: (date, locale) => {
      const monthName = date.toLocaleDateString(locale, {
        month: 'long',
      });
      return monthName.slice(0, 3);
    },
    Mmm: (date, locale) => {
      const monthName = date.toLocaleDateString(locale, {
        month: 'long',
      });
      return (monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()).slice(0, 3);
    },
    mmmm: (date, locale) =>
            date.toLocaleDateString(locale, {
              month: 'long',
            }),
    Mmmm: (date, locale) => {
      const monthName = date.toLocaleDateString(locale, {
        month: 'long',
      });
      return monthName[0].toUpperCase() + monthName.slice(1).toLowerCase();
    },
  };
  const formatRegex = new RegExp(['yyyy', 'Mmmm', 'mmmm', 'Mmm', 'mmm', 'mm', 'm'].join('|'), 'g');

  return function (locale, format, date) {
    const componetsRegex = /(\[[^\]]+\])([^\[\]]+)(\[[^\]]+\])/;
    const components = format.match(componetsRegex).slice(1);
    const separator = components[1];
    const labels = [components[0], components[2]].map((component) => {
      const label = component.replace(/\[[^\]]+\]/, str => str.slice(1, -1).replace(formatRegex, match => formats[match](date, locale)));
      return {
        label,
        type: component.indexOf('yy') != -1 ? 'year' : 'month',
      };
    });
    return {
      separator,
      labels,
    };
  };
}());

// Parsers and Formaters
export const DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
};

export const RANGE_SEPARATOR = ' - ';

const DATE_FORMATTER = function (value, format) {
  return formatDate(value, format);
};
const DATE_PARSER = function (text, format) {
  return parseDate(text, format);
};
const RANGE_FORMATTER = function (value, format) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];

    if (start && end) {
      return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format);
    }
  } else if (!Array.isArray(value) && value instanceof Date) {
    return formatDate(value, format);
  }
  return '';
};
const RANGE_PARSER = function (text, format) {
  const array = Array.isArray(text) ? text : text.split(RANGE_SEPARATOR);
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];

    return [parseDate(range1, format), parseDate(range2, format)];
  }
  return [];
};

export const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter(value) {
      if (!value) return '';
      return `${value}`;
    },
    parser(text) {
      if (text === undefined || text === '') return null;
      return text;
    },
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER,
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER,
  },
  multiple: {
    formatter: (value, format) => value.filter(Boolean).map(date => formatDate(date, format)).join(','),
    parser: (value, format) => {
      const values = typeof value === 'string' ? value.split(',') : value;
      return values.map((value) => {
        if (value instanceof Date) return value;
        if (typeof value === 'string') value = value.trim();
        else if (typeof value !== 'number' && !value) value = '';
        return parseDate(value, format);
      });
    },
  },
  number: {
    formatter(value) {
      if (!value) return '';
      return `${value}`;
    },
    parser(text) {
      const result = Number(text);

      if (!isNaN(text)) {
        return result;
      }
      return null;
    },
  },
};

