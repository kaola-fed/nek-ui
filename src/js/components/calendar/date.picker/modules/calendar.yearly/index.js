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
    name: 'yearly.calendar',
    template: template,
    config: function(data){
        this.defaults({
            date4Disp: undefined,   // 用于显示日历
            visible: true,          // 默认展示
            maxPeriod: 2,
            max: undefined,
            min: 2014,

            _days: [],
            values: [],
        });

        this.$watch('date4Disp', function(newVal, oldVal){
            var data = this.data;
            // 如果超出日期范围，则设置为范围边界的日期
            var isOutOfRange = this.isOutOfRange(newVal);
            if (isOutOfRange) {
                var diff =  Math.floor((isOutOfRange - 2014)/16) * 16;
                data.date4Disp = 2014 + diff;
                // 防止第二次刷新同月
                this._update(data.date4Disp);
                return;
            }
            if(newVal !== oldVal) {
                this._update(this.data.date4Disp);
            }
        });

        this.$watch('max', function(newVal){
            var data = this.data;
            if(newVal && typeof newVal !== 'number' && newVal.getFullYear) {
                if(newVal.getFullYear() < data.date4Disp.getFullYear()){
                    data.date4Disp = new Date(newVal).getFullYear();
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
        data.date4Disp = 2014;
        this._update(data.date4Disp);
    },

    /**
     * @method _update() 日期改变后更新日历
     * @return {void}
     */
    _update: function(date) {
        var data = this.data;
        var base = date;
        data._days = [];
        for(var i = 0; i < 16; i++){
            data._days.push({
                val: base + i,
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
        if(mode === 0) {
            return start + '';
        } else {
            return start + '~' + end + '';
        }
    },

    /**
     * @method addYear(year) 调整年份
     * @param  {number=0} year 加/减的年份
     * @return {Date} date 计算后的日期
     */
    addYear: function(year) {
        this.data.date4Disp += 16 * year;
        this._update(this.data.date4Disp)
    },

});