module.exports = {
  /**
     *  测试数据:
     *  1, +1, -1, ++1, ++++, 1++, 1+1, 001, 01
     * */
  int(_value) {
    let value = _value.replace(/[^\d+-]/g, '');

    const regexp = /[+-]?\d*/;
    const match = regexp.exec(value);
    if (match) value = match[0];

    if (value && !isNaN(value)) value = parseInt(value);
    return value;
  },
  /**
     *  测试数据:
     *  1.123, +1.123, -1.123, ++1.123, 1+++.23+, 1++.23, 1+1.23, 132.12.12
     * */
  float(_value, decimalDigits) {
    /* eslint no-useless-escape: 0 */
    let value = _value.replace(/[^\d+-\.]/g, '');

    const regexp = /([+-]?\d*(\.\d*)?)/;
    const match = regexp.exec(value);
    if (match) value = match[0];

    // 这里没使用toFixed, 是因为不希望四舍五入,不断输入最后一位数字会一直变大
    const digits = value.split('.');
    if (digits[1] && decimalDigits) {
      value = `${digits[0]}.${digits[1].substring(0, decimalDigits)}`;
    }

    return value;
  },
  default(value) {
    return value;
  },
};
