'use strict';
var dom = require('regularjs').dom;

var Component = require('../../../../../ui-base/component.js');
var _ = require('../../../../../ui-base/_.js');
var style = require('./index.mcss');
var template = require('./index.html');

var DailyCalendar = require('../calendar.daily/index.js');
var MonthlyCalendar = require('../calendar.monthly/index.js');
var SeasonlyCalendar = require('../calendar.seasonly/index.js');
var YearlyCalendar = require('../calendar.yearly/index.js');

var DateBody = Component.extend({
    name: 'date.picker',
    template: _.compressHtml(template),
    config: function(){
        this.supr();

        this.defaults({
            _day: {},
            _week: {},
            _month: {},
            _quater: {},
            _season: {},
            _year: {},
        });

        this.$watch('fixPeriod', this.onFixPeriodChange);

        this.setModule();
        if(this.data.config[0]) {
            this.onModuleSelect(this.data.config[0].type);
        }
    },

    onFixPeriodChange: function(newVal, oldVal){
        var data = this.data;
        if(data.mode === 2) {
            var picker = data['_'+data.module];
            picker.startDate = undefined;
            picker.endDate = undefined;
            picker.period = undefined;
            picker.hoverStartDate = undefined;
            picker.date = undefined;

            data.value = undefined;
            data.current.param = picker;
            data.value4Disp = undefined;
        }
    },

    init: function(){
        if (this.$root == this) {
            this.$inject(document.body);
        }
        this.data.element = dom.element(this);
        dom.on(this.data.element, 'click', function(e) { e.stopPropagation(); });
    },

    getElement: function () {
        return this.data.element;
    },

    setModule: function(){
        var data = this.data;
        data.config.forEach(function(item){
            var t = data['_'+item.type];
            data['_'+item.type] = _.clone(item);
            _.extend(data['_'+item.type], {
                maxPeriod: item.maxPeriod || t.maxPeriod,
                fixPeriod: item.fixPeriod || t.fixPeriod,
                mode: item.mode !== undefined ? item.mode : data.mode,
            });
            if( t !== undefined) {
                t.maxPeriod = item.maxPeriod || t.maxPeriod;
                t.fixPeriod = item.fixPeriod || t.fixPeriod ;
                t.mode = item.mode !== undefined ? item.mode : data.mode;
            }
        });
    },

    onModuleSelect: function(type){
        this.data.module = type;
        // this.data.module = 'month';
    },

    setDefault: function(type, startDate, endDate){
        var data = this.data;
        var timepicker = this.$refs[type+'picker'];
        if(timepicker) {
            timepicker.setPeriod(startDate, endDate);
        }
    },

    _$setDefault: function(type, start, end){
        var data = this.data;
        if(type) {
            this.onModuleSelect(type);
            this.setDefault(type, start, end);
            setTimeout(function(){
                this.updateData();

                this.$emit('change', {
                    sender: this,
                    module: data.module,
                    value: data.value,
                    period: data.period,
                })
            }.bind(this), 100);
        }
    },

    onOK: function(){
        var data = this.data;
        this.updateData();
        this.toggle(false);

        this.$emit('change', {
            sender: this,
            module: data.module,
            value: data.value,
            period: data.period,
        })
    },

    updateData: function(){
        var data = this.data;
        var param = data['_'+data.module];

        // 保存当前选择参数, 打开时用来设置默认值
        data.current.type = data.module;
        data.current.param = _.extend({}, param);

        // 更新各项属性
        data.value4Disp = param.period;
        this.updateValue(data.module, param.startDate, param.endDate);
        this.updatePeriod(data.module, param.startDate, param.endDate);
    },

    updateValue: function(type, start, end) {
        var val = '';
        switch (type) {
            case 'day':
                val = moment(start).format('YYYY-MM-DD') + '~' + moment(end).format('YYYY-MM-DD');
                break;
            case 'month':
                val = this.getMonth(start).first + '~' + this.getMonth(end).last;
                val = this.getMonth(start).first + '~' + this.getMonth(end).last;
                break;
            case 'season':
                val = this.getSeason(start).first + '~' + this.getSeason(end).last;
                break;
            case 'year':
                val = this.getYear(start).first + '~' + this.getYear(end).last;
                break;
            default:
        }
        this.data.value = val;
        // console.log(val);
    },

    updatePeriod: function(type, start, end) {
        var period = '';
        switch (type) {
            case 'day':
                period = Math.floor((+end - +start) / MS_OF_DAY) + 1;
                break;
            case 'month':
                var first = new Date(this.getMonth(start).first);
                var last = new Date(this.getMonth(end).last);
                period = Math.floor((+last - +first) / MS_OF_DAY) + 1;
                break;
            case 'season':
                var first = new Date(this.getSeason(start).first);
                var last = new Date(this.getSeason(end).last);
                period = Math.floor((+last - +first) / MS_OF_DAY) + 1;
                break;
            case 'year':
                var first = new Date(this.getYear(start).first);
                var last = new Date(this.getYear(end).last);
                period = Math.floor((+last - +first) / MS_OF_DAY) + 1;
                break;
            default:
        }
        // console.log(period);
        this.data.period = period;
    },

    onShortCutSelect: function(type, val){
        switch (type) {
            case 'day':
                this.dayShortCut(val); break;
            case 'month':
                this.monthShortCut(val); break;
            default:
        }
    },

    getMonth: function(date) {
        var dat = new Date(+date);
        var year = dat.getFullYear();
        var mon = dat.getMonth();
        return {
            first: moment(new Date(year, mon, 1)).format('YYYY-MM-DD'),
            last: moment(new Date(year, mon + 1, 0)).format('YYYY-MM-DD'),
        }
    },

    getSeason: function(val) {
        var year = (val / 100)>>0;
        var season = Math.floor((val - year * 100) / 25);
        var firstMon = season * 3;
        var lastMon = firstMon + 2;
        return {
            first: this.getMonth(new Date(year, firstMon)).first,
            last: this.getMonth(new Date(year, lastMon)).last,
        }
    },

    getYear: function(year) {
        return {
            first: year + '-01-01',
            last: year + '-12-31',
        }
    },

    /**
     * 按日选快捷选择
     * @param  {number} n 快捷选择时间
     */
    dayShortCut: function(n) {
        var data = this.data;
        var max = data._day.max || new Date();
        var date0, date1;
        switch (n) {
            // 本月
            case -1:
                date0 = new Date(max);
                date1 = new Date(now);
                date0.setDate(1);
                if(date1.getDate() != 0) {
                    date1.setDate(date1.getDate()-1);
                }
                break;
            // 上月
            case -2:
                date0 = new Date(now);
                date1 = new Date(new Date(date0.getFullYear(), date0.getMonth(), 1)-1);
                date0.setMonth(date0.getMonth()-1);
                date0.setDate(1);
                break;
            // 昨天
            case -3:
                date0 = new Date();
                date0 = new Date(new Date(date0.getFullYear(), date0.getMonth(), date0.getDate())-1);
                date1 = date0;
                break;
            // 近n天
            default:
                date0 = new Date(max);
                date1 = new Date(date0.getFullYear(), date0.getMonth(), date0.getDate());
                date0 = new Date(+date1 - MS_OF_DAY * (n - 1));
        }
        this.$refs.daypicker.setPeriod(date0, date1);
    },

    /**
     * 按月选快捷选择
     * @param  {number} n 快捷选择时间
     */
    monthShortCut: function(n){
        var data = this.data;
        var date0, date1;
        var year = now.getFullYear();
        var month = now.getMonth();
        switch (n) {
            // 本月
            case -1:
                date1 = date0 = new Date(year, month);
                break;
            // 近n个月
            default:
                date1 = new Date(year, month);
                date0 = new Date(year, month - n + 1);
        }
        this.$refs.monthpicker.setPeriod(date0, date1)
    },

    onCancel: function(){
        this.toggle();
    },
})
.filter('selectDisp', function(text){
    var labels = {
        day: '日',
        month: '月',
        season: '季',
        year: '年',
        week: '周',
    };
    return labels[text];
});

module.exports = DateBody;