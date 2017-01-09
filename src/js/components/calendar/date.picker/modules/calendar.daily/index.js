/**
 * ------------------------------------------------------------
 * Calendar 日历控件
 * @version  1.0
 * @author wuziran (hzwuziran@corp.netease.com)
 * @example
 * ------------------------------------------------------------
 */
'use strict';
var moment = require('moment');

var RangeSelector = require('../range.selector/index.js');
var template = require('./index.html');


var MS_OF_DAY = 24*3600*1000,
    SINGLE_COUNT = 42;
module.exports = RangeSelector.extend({
    name: 'daily.calendar',
    template: template,
    config: function() {
        var self = this,
            now = new Date();

        this.defaults({
            date4Disp: undefined,   // 用于显示日历

            max: undefined,
            maxPeriod: 60,

            visible: true,          // 默认展示
            _days: [],
        });

        this.supr();


        this.$watch('start', function(newVal, oldVal){
            if(this.data.type === 0) {
                this.updateDate4Disp(newVal);
            }
        });

        // new Date(+now), // 当前为最大可选日期

        this.$watch('end', function(newVal, oldVal){
            if(this.data.type === 1) {
                this.updateDate4Disp(newVal);
            }
        });

        this.$watch('date4Disp', function(newValue, oldValue){
            var data = this.data;

            // 字符类型自动转为日期类型
            if(typeof newValue === 'string' || typeof newValue === 'number') {
                return data.date4Disp = new Date(newValue);
            } else if (!newValue) {
                // 如果newValue为空， 则自动转到今天
                return data.date4Disp = new Date((new Date/MS_OF_DAY>>0)*MS_OF_DAY);
            } else if (newValue == 'Invalid Date') {
                return data.date4Disp = new Date(data.max);
                // throw new TypeError('Invalid Date');
            }

            // 如果超出日期范围，则设置为范围边界的日期
            var isOutOfRange = this.isOutOfRange(newValue);
            if (isOutOfRange) {
                data.date4Disp = isOutOfRange;

                // 防止第二次刷新同月
                this._update(data.date4Disp);
                return;
            }

            if(oldValue && oldValue.getMonth
                && (newValue.getFullYear() !== oldValue.getFullYear() || newValue.getMonth() !== oldValue.getMonth())) {
                this._update(data.date4Disp);
            }
        });

    },

    init: function() {
        this.reset();
        this.supr();
    },

    reset: function() {
        var data = this.data,
            now = new Date();

        data.date4Disp = new Date(+now - MS_OF_DAY);
        this._update(data.date4Disp);
    },

    updateDate4Disp: function(val){
        setTimeout(function(){
            this.data.date4Disp = new Date(val);
            this.$update();
        }.bind(this), 50);
    },

    /**
     * 格式化period显示
     * @param  {number} mode 选择模式
     * @param  {number} start 起始值
     * @param  {number} end   终止值
     * @return {string}       格式化后的值
     */
    __formatPeriod: function(mode, start, end) {
        var startStr = moment(start).format('YYYY.MM.DD');
        var endStr = moment(end).format('YYYY.MM.DD');
        if(mode === 0) {
            return startStr;
        } else {
            return startStr + '~' + endStr;
        }
    },

    /**
     * @method _update() 日期改变后更新日历
     * @return {void}
     */
    _update: function(_date) {
        var data = this.data,
            date, month, firstDay, firstTime, lastTime, nfirstDay, nfirstTime,
            num, tmpTime, tmpDay, days;

        data._days = [];
        data._predays = [];
        data._months = [];

        date = _date;
        month = date.getMonth();

        // first day for current month
        firstDay = new Date(date);
        firstTime = firstDay.setDate(1);

        // first day for next month
        nfirstDay = new Date(firstDay);
        nfirstDay.setMonth(month + 1);
        nfirstTime = nfirstDay.setDate(1);
        lastTime = nfirstTime - MS_OF_DAY;
        num = -firstDay.getDay() || -7;

        days = data._days;

        // 保存日历所有日期项
        do {
            tmpTime = firstTime + (num++)*MS_OF_DAY;
            tmpDay = new Date(tmpTime);
            days.push({
                date: tmpDay,
                muted: date.getMonth() !== tmpDay.getMonth(),
                selected: false,
                hovered: false,
                start: false,
                end: false
            });
        } while (days.length < SINGLE_COUNT);
    },

    /**
     * @method addYear(year) 调整年份
     * @param  {number=0} year 加/减的年份
     * @return {Date} date 计算后的日期
     */
    addYear: function(year) {
        if(this.data.readonly || this.data.disabled || !year)
            return;

        if (isNaN(year)) {
            throw new TypeError(year + ' is not a number!');
        }

        var date = new Date(this.data.date4Disp);
        var oldMonth = date.getMonth();
        date.setFullYear(date.getFullYear() + year);

        this.data.date4Disp = date;

        return date;
    },

    /**
     * @method addMonth(month) 调整月份
     * @param  {number=0} month 加/减的月份
     * @return {Date} date 计算后的日期
     */
    addMonth: function(month) {
        if(this.data.readonly || this.data.disabled || !month) {
            return;
        }

        if(isNaN(month)) {
            throw new TypeError(month + ' is not a number!');
        }

        var date = new Date(this.data.date4Disp);
        var correctMonth = date.getMonth() + month;
        date.setMonth(correctMonth);

        this.data.date4Disp = date;

        return date;
    },

    __getHoverStart: function(hover, fixPeriod){
        var hoverStart = +hover - (fixPeriod - 1) *MS_OF_DAY;
        return new Date(hoverStart);
    },

    __isWithinPeriod: function(date){
        var data = this.data;
        var diff = (data.maxPeriod - 1) *MS_OF_DAY;
        return (this.isWithinRange(date, +data.pick - diff, +data.pick + diff));
    },

    __isL: function(val1, val2) {
        var date0 = new Date(+val1);
        var date1 = new Date(+val2);
        return date0.getFullYear() < date1.getFullYear()
                || (date0.getFullYear() === date1.getFullYear()  && date0.getMonth() < date1.getMonth() )
                || (date0.getFullYear() === date1.getFullYear()  && date0.getMonth() === date1.getMonth() && date0.getDate() < date1.getDate());
    },

    __isEqual: function(val1, val2) {
        var date0 = new Date(val1);
        var date1 = new Date(val2);
        return date0.getFullYear() == date1.getFullYear()
                && date0.getMonth() == date1.getMonth()
                && date0.getDate() == date1.getDate();
    },
})
.filter('format', function(text, f){
    if (f === 'yyyy') return moment(text).year();
    if (f === 'MM') return moment(text).month() + 1;
    if (f === 'dd') return moment(text).date();
});