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
  required: {type:'isRequired', message:'请填写'},
  isEmail: {type:'isEmail', message:'格式错误'},
  isURL: {type:'isURL', message:'格式错误'},
  isInt: function(min, max, message) {
    min = min/1 || -Infinity;
    max = max/1 || Infinity;
    return {type:'isInt', message:message || '错误的值', options:{min:min, max:max}};
  },
  isFloat: function(min, max, message) {
    min = min/1 || -Infinity;
    max = max/1 || Infinity;
    return {type:'isFloat', message:message || '错误的值', options:{min:min, max:max}};
  },
  byteLen: function(min, max, message) {
    min = min || 0;
    max = max || Infinity;
    return {message:message || '长度错误', method: function(value) {
      var len = stringBytes(value);
      return len >= min && len <= max;
    }};
  }
};