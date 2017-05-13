var _ = require('../../../../ui-base/_');

function stringBytes(c){
  var n=c.length,s;
  var len=0;
  for(var i=0; i <n;i++){
   s=c.charCodeAt(i);
   while( s > 0 ){
      len++;
      s = s >> 8;
   }
  }
  return len;
}

module.exports = {
  required: {type:'isRequired', message: _.$trans('PLEASE_INPUT')},
  isEmail: {type:'isEmail', message: _.$trans('FORMAT_ERROR')},
  isURL: {type:'isURL', message: _.$trans('FORMAT_ERROR')},
  isInt: function(min, max, message) {
    min = min/1 || -Infinity;
    max = max/1 || Infinity;
    return {type:'isInt', message:message || _.$trans('VALUE_ERROR'), options:{min:min, max:max}};
  },
  isFloat: function(min, max, message) {
    min = min/1 || -Infinity;
    max = max/1 || Infinity;
    return {type:'isFloat', message:message || _.$trans('VALUE_ERROR'), options:{min:min, max:max}};
  },
  byteLen: function(min, max, message) {
    min = min || 0;
    max = max || Infinity;
    return {message:message || _.$trans('LENGTH_ERROR'), method: function(value) {
      value = value || '';
      var len = stringBytes(value);
      return len >= min && len <= max;
    }};
  }
};