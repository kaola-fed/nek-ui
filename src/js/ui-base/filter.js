exports.format = (function () {
  function fix(str) {
    str = `${String(str) || ''}`;
    return str.length <= 1 ? `0${str}` : str;
  }
  const maps = {
    yyyy(date) {
      return date.getFullYear();
    },
    MM(date) {
      return fix(date.getMonth() + 1);
    },
    dd(date) {
      return fix(date.getDate());
    },
    HH(date) {
      return fix(date.getHours());
    },
    mm(date) {
      return fix(date.getMinutes());
    },
    ss(date) {
      return fix(date.getSeconds());
    },
  };

  const trunk = new RegExp(Object.keys(maps).join('|'), 'g');
  return function (value, format) {
    if (!value) {
      return '';
    }
    format = format || 'yyyy-MM-dd HH:mm';
    value = new Date(value);

    return format.replace(
      trunk,
      capture => (maps[capture] ? maps[capture](value) : ''),
    );
  };
}());

exports.average = function (array, key) {
  array = array || [];
  return array.length ? exports.total(array, key) / array.length : 0;
};
exports.total = function (array, key) {
  let total = 0;
  if (!array) return;
  array.forEach((item) => {
    total += key ? item[key] : item;
  });
  return total;
};

exports.filter = function (array, filterFn) {
  if (!array || !array.length) return;
  return array.filter((item, index) => filterFn(item, index));
};
