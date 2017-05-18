var _ = {};

_.isType = function(target, type) {
    return Object.prototype.toString.call(target).toLowerCase() === '[object ' + type + ']';
};

[
    'String',
    'Object',
    'Array',
    'Number',
    'Null',
    'Undefined'
].forEach(function(item) {
    _['is' + item] = function(target){
        return _.isType(target, item.toLowerCase());
    };
});

_.fillWithZero = function(val, len) {
    var valLen = val.toString().length;
    if(valLen < len) {
        return (Array(len).join(0) + val).slice(-len);
    }
    return val + '';
};

_.throttle = function(fn, delay) {
    var last = null;
    var timer = null;
    delay = delay || 100;
    return function() {
        var now = +new Date();
        var args = [].slice.call(arguments, 0);

        clearTimeout(timer);
        if(now - last > delay) {
            last = now;
            fn.apply(this, args);
        } else {
            // run at last time
            setTimeout(function() {
                fn.apply(this, args);
            }.bind(this), delay);
        }
    };
};

module.exports = _;
