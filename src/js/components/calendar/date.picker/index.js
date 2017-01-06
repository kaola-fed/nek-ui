/**
 * -------------------------------------------------------
 * 时间选择器
 * @version 1.0
 * @author wuziran(hzwuziran@corp.netease.com)
 *
 * ```html
 * <timepicker mode={1}
 *      config={timepicker.config} period={timepicker.period}
 *      on-change={this.onTimePickerChange($event)}
 *      />
 * <timepicker mode={2}
 *      config={timepicker2.config} fixPeriod={timepicker2.fixPeriod}
 *      on-change={this.onTimePicker2Change($event)}
 *      />
 *  ```
 *
 * ```javascript
        setTimePickerData: function(){
            var today = new Date();
            var yesterday = new Date(today.setDate(today.getDate() - 1));
            this.data.timepicker = {
                config: [
                    { type: 'day', maxPeriod: 60, max: yesterday},
                    { type: 'month', maxPeriod: 12, max: today},
                    { type: 'season', maxPeriod: 5, max: today},
                    { type: 'year', maxPeriod: 3, max: today.getFullYear()},
                ],
            };
            this.data.timepicker2 = {
                config: [
                    { type: 'day', maxPeriod: 10000},
                ],
            };
        }
    ```
 * -------------------------------------------------------
 * ```
 */
'use strict';

var moment = require('moment');
var dom = require('regularjs').dom;

var Component = require('../../../ui-base/component.js');
var _ = require('../../../ui-base/_.js');
var Trigger = require('../../layout/alignment/trigger.js');
var DateBody = require('./modules/date.body/index.js');
var style    = require('./index.mcss');
var template = require('./index.html');

var MS_OF_DAY = 24*3600*1000;
var now = new Date();

var TimePicker = Component.extend({
    name: 'date.picker',
    template: _.compressHtml(template),
    config: function(){
        this.defaults({
            open: false,
            config: [],
            position: 'left',
            show: true,
            mode: 0,    // 0: single, 1: range, 2: fix-range
            module: undefined,
            value4Disp: '',  // 显示值
            value: '',       // 实际值
            period: undefined,
            fixPeriod: undefined,
            current: {
                type: null,
                param: {},
            },
            placement: 'bottom'
        });
        this.supr();
    },

    getInstance: function() {
        if (!this.data.instance) {
            var instance = new DateBody({ data: this.data });

            instance.$on('ok', function(data) {
                if (this.events && this.events.ok) {
                    this.$emit('ok', data);
                } else {
                    this.data.instance.destroy();
                }

            }.bind(this));

            instance.$on('cancel', function(data) {
                if (this.events && this.events.cancel) {
                    this.$emit('cancel', data);
                } else {
                    this.data.instance.destroy();
                }
            }.bind(this));

            instance.$on('destroy', function() {
                this.$refs.trigger.data.isShow = false;
                this.data.instance = null;
            }.bind(this));

            this.data.instance = instance;
        }
        return this.data.instance;
    },

    reAlign: function() {
        var $alignment = this.$refs.alignment;
        $alignment.reAlign(this.data.bodyEl);
    },

});

module.exports = TimePicker;