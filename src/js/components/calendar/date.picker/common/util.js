var moment = require('moment');

module.exports = {
    /**
     * 根据mode做如下转换:
     * mode0:1483488000000 to 2017-01-04
     * mode1:1483488000000~1483488000000 to 2017-01-04~2017-01-04
     * mode2:1483488000000~1483488000000 to 2017-01-04~2017-01-04
     **/
    value2Disp: function(value, mode) {
        if (mode == 0) {
            return moment(value).format('YYYY-MM-DD');
        } else {
            var range = value.split('~');
            return moment(range[0]).format('YYYY-MM-DD') + '~' + moment(range[1]).format('YYYY-MM-DD');
        }
    },
    /**
     * 根据mode做如下转换:
     * mode0:2017-01-04 to 1483488000000
     * mode1:2017-01-04~2017-01-04 to 1483488000000~1483488000000
     * mode2:2017-01-04~2017-01-04 to 1483488000000~1483488000000
     **/
    disp2Value: function(value, mode) {
        if (mode == 0) {
            return +new Date(value);
        } else {
            var range = value.split('~');
            return +new Date(range[0]) + '~' + (+new Date(range[1]));
        }
    },
    // mode是时间范围时,获取Date型开始时间
    getStartDate: function(value) {
        var range = value.split('~');
        return new Date(range[0]);
    },
    // mode是时间范围时,获取Date型结束时间
    getEndDate: function() {
        var range = value.split('~');
        return new Date(range[1]);
    }
};