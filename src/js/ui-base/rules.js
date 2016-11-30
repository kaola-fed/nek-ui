module.exports = {
  isRequired: function(message) {
      return [{type:'isFilled', message:message || '必填项'}];
  },
  isEmail: function(message) {
      return [{type:'isEmail', message:message || '格式错误'}]
  },
  isInt: function(message) {
      return [{type:'isInt', message:message || '请填写整数'}];
  },
  isFloat: function(min, max, message) {
    if (min == undefined && max == undefined)
      return [{type:'isFloat', message:message || '格式错误'}];
    return [{type:'isFloat', message:message || '格式错误', options:{min:min, max:max}}];
  },
  isLarger: function(min, message) {
    return this.isFloat(min, undefined, message || '数值过小');
  },
  isSmaller: function(max, message) {
    return this.isSmaller(undefined, max, message || '数值过大');
  },
  isByteLength: function(min, max, message) {
    var message = '';
    min = min || 0;
    if (min != undefined || max != undefined)
      return [{type:'isByteLength', message:message || '长度错误', options:{min:min, max:max}}];
  },
  isURL: function(message) {
      return [{type:'isURL', message:message || '格式错误'}];
  }
};