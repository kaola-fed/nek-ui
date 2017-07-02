var Regular = require('regularjs');

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
    var self = this;
    var last = null;
    var timer = null;
    delay = delay || 100;
    return function() {
        var now = +new Date();
        var args = [].slice.call(arguments, 0);

        clearTimeout(timer);
        if(now - last > delay) {
            last = now;
            fn.apply(self, args);
        } else {
            // run at last time
            setTimeout(function() {
                fn.apply(self, args);
            }, delay);
        }
    };
};

_.convertBeginEnd = function(str) {
    var BEGIN = Regular._BEGIN_;
    var END = Regular._END_;
    str = '' + str;
    if(BEGIN && BEGIN !== '{') {
        str = str.replace(/{/g, BEGIN);
    }
    if(END && END !== '}') {
        str = str.replace(/}/g, END);
    }
    return str;
};

var hasChildren = function(root) {
    return root.children && root.children.length > 0
};

_.getHeaders = function(columns) {
    var headers = [];
    var extractHeaders = function(columns, depth) {
        columns.forEach(function(column) {
            if(hasChildren(column)) {
                column._dataColumn = extractHeaders(column.children, depth + 1);
            }
            if(!headers[depth]) {
                headers[depth] = [];
            }
            // 计算深度和宽度
            if(hasChildren(column)) {
                column.childrenDepth = 1 + column.children.reduce(function(previous, current) {
                    return current.childrenDepth > previous ? current.childrenDepth : previous;
                }, -1);
                column.headerColSpan = column.children.reduce(function(previous, current) {
                    return previous + (current.headerColSpan || 0);
                }, 0);
            } else {
                column.childrenDepth = 0;
                column.headerColSpan = 1;
            }
            headers[depth].push(column);
        });
    };
    extractHeaders(columns, 0);
    return headers;
};

_.getLeaves = function(tree) {
    var res = [];
    var extractLeaves = function(root) {
        if(root.forEach) {
            return root.forEach(function(item) {
                if(hasChildren(item)) {
                    extractLeaves(item.children);
                } else {
                    res.push(item);
                }
            });
        }
    };
    extractLeaves(tree);
    return res;
};

var getNum = _.getNum = function(str) {
    return +((str+'').split('px')[0]);
};

_.setElementValue = function(ele, prop, val) {
    if(ele) {
        ele[prop] = val;
    }
};

_.getElementHeight = function(ele) {
    var computedStyle = window.getComputedStyle(ele);
    var height = getNum(computedStyle.marginTop)
            + getNum(computedStyle.borderTopWidth)
            + getNum(ele.offsetHeight)
            + getNum(computedStyle.borderBottomWidth)
            + getNum(computedStyle.marginBottom);
    return height;
}


module.exports = _;
