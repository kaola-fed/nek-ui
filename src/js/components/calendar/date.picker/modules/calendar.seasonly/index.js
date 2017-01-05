/**
 * ------------------------------------------------------------
 * Monthly Calendar 月历控件
 * @version  1.0
 * @author wuziran (hzwuziran@corp.netease.com)
 * @example
 * ------------------------------------------------------------
 */
'use strict';
var moment = require('moment');

var RangeSelector = require('../range.selector/index.js');
var template = require('./index.html');
var style = require('./index.mcss');


module.exports = RangeSelector.extend({
    name: 'seasonly.calendar',
    template: template,
    config: function(data){
        this.defaults({
            date4Disp: undefined,   // 用于显示日历
            visible: true,          // 默认展示
            maxPeriod: 2,
            max: undefined,

            _days: [],
            values: [],
        });


        this.$watch('start', function(newVal, oldVal){
            if(this.data.type === 0) {
                this.updateDate4Disp(newVal);
            }
        });

        this.$watch('end', function(newVal, oldVal){
            if(this.data.type === 1) {
                this.updateDate4Disp(newVal);
            }
        });

        this.$watch('date4Disp', function(newVal, oldVal){
            var data = this.data;
            // 字符类型自动转为日期类型
            if(typeof newVal === 'string' || typeof newVal=== 'number') {
                return data.date4Disp = new Date(new Date(+newValue).getFullYear(), 0);
            } else if (!newVal) {
                // 如果newValue为空， 则自动转到今天
                return data.date4Disp = new Date(new Date().getFullYear(), 0);
            } else if (newVal == 'Invalid Date') {
                return data.date4Disp = new Date(new Date().getFullYear(), 0);
            }
            newVal = new Date(data.date4Disp.setMonth(0));

            // 如果超出日期范围，则设置为范围边界的日期
            var isOutOfRange = this.isOutOfRange(newVal);
            if (isOutOfRange) {
                data.date4Disp = new Date(isOutOfRange);
                // 防止第二次刷新同月
                this._update(data.date4Disp);
                return;
            }

            if(oldVal && (newVal.getFullYear() !== oldVal.getFullYear() || newVal.getMonth() !== oldVal.getMonth())) {
                this._update(data.date4Disp);
            }
        });

        this.$watch('max', function(newVal){
            var data = this.data;
            if(newVal && typeof newVal !== 'number' && newVal.getFullYear) {
                if(newVal.getFullYear() < data.date4Disp.getFullYear()){
                    data.date4Disp = new Date(newVal);
                }
                var month = newVal.getMonth();
                var season = Math.floor(month / 3);
            }

        });

        this.supr(data);
    },

    init: function(){
        this.reset();
        this.supr();
    },

    reset: function(){
        var  data = this.data;
        data.date4Disp = new Date();
        this._update(data.date4Disp);
    },

    updateDate4Disp: function(val){
        setTimeout(function(){
            var season = this.getSeasonInfo(val);
            this.data.date4Disp = new Date(season.year, 0);
            this.$update();
        }.bind(this), 50);
    },

    /**
     * @method _update() 日期改变后更新日历
     * @return {void}
     */
    _update: function(_date) {
        var data = this.data;
        var tmpDay = new Date(_date);
        var year = tmpDay.getFullYear();
        data._days = [];
        for(var i = 0; i < 4; i++){
            data._days.push({
                label: i + 1,
                val: year * 100 + i * 25,
                // muted: data.pick.getFullYear() !== tmpDay.getFullYear(),
                selected: false,
                hovered: false,
                start: false,
                end: false
            });
        }
    },

    /**
     * 格式化period显示
     * @param  {number} mode 选择模式
     * @param  {number} start 起始值
     * @param  {number} end   终止值
     * @return {string}       格式化后的值
     */
    __formatPeriod: function(mode, start, end) {
        var startYear = (start / 100)>>0;
        var endYear = (end / 100)>>0;
        var startSeason = (start - startYear * 100) / 25 + 1;
        var endSeason = (end - endYear * 100) / 25 + 1;
        if(mode === 0) {
            return startYear + '.' + numCN(startSeason) + '季度';
        } else {
            return startYear + '.' + numCN(startSeason) + '季度~' +
                    endYear + '.' + numCN(endSeason) + '季度';
        }
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

    __getHoverStart: function(hover, fixPeriod){
        var diff = (fixPeriod - 1) * 25;
        return hover - diff;
    },

    __isWithinPeriod: function(val){
        var data = this.data;
        var pick = data.pick;
        var diff = (data.maxPeriod - 1) * 25;
        return (this.isWithinRange(val , +pick - diff, +pick + diff));
    },

    getSeasonInfo: function(val) {
        var year = (val / 100)>>0;
        var season = (val - year * 100) / 25 + 1;
        return {
            year: year,
            season: season,
        }
    },

})
.filter('numCN', function(num){
    return numCN(num);
})
.filter('format', function(text, f){
    if (f === 'yyyy') return moment(text).year();
    if (f === 'MM') return moment(text).month() + 1;
    if (f === 'dd') return moment(text).date();
});

var numCN = function(num) {
    var cn = ['零', '一', '二', '三', '四'];
    return cn[num];
};