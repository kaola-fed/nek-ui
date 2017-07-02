module.exports = {
    /**
     *  测试数据:
     *  1, +1, -1, ++1, ++++, 1++, 1+1, 001, 01
     * */
    "int": function(value) {
        value = value.replace(/[^\d+-]/g, '');

        var regexp = /[+-]?\d*/;
        var match = regexp.exec(value);
        if (match) value = match[0];

        if (value && !isNaN(value)) value = parseInt(value);
        return value;
    },
    /**
     *  测试数据:
     *  1.123, +1.123, -1.123, ++1.123, 1+++.23+, 1++.23, 1+1.23, 132.12.12
     * */
    "float": function(value, decimalDigits) {
        value = value.replace(/[^\d+-\.]/g, '');

        var regexp = /([+-]?\d*(\.\d*)?)/;
        var match = regexp.exec(value);
        if (match) value = match[0];

        // 这里没使用toFixed, 是因为不希望四舍五入,不断输入最后一位数字会一直变大
        var digits = value.split('.');
        if (digits[1] && decimalDigits) {
            value = digits[0] + '.' + digits[1].substring(0, decimalDigits);
        }
  
        return value;
    },
    "default": function(value) { return value; }
};