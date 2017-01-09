/**
 * -------------------------------------------------------
 * 时间选择器
 * @version 1.0
 * @author wuziran(hzwuziran@corp.netease.com)
 */
'use strict';

var moment = require('moment');
var bowser = require('bowser');

var Component = require('../../../ui-base/component.js');
var _ = require('../../../ui-base/_.js');
var DateUtil = require('./common/util.js');
var polyfill = require('../../../ui-base/polyfill');
var DateBody = require('./modules/date.body/index.js');
var template = require('./index.html');

require('../../layout/alignment/trigger.js');


/**
 * @class DatePicker
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string=''}               options.data.value              <=> 当前选择的日期时间
 * @param {number}                  options.data.mode                => 0:单选模式;1:范围选择;2:固定范围选择
 * @param {boolean=false}           options.data.showTime            => 是否显示时间选择
 * @param {string='请输入'}          options.data.placeholder         => 文本框的占位文字
 * @param {array}                   options.data.config              => 日期配置
 * @param {boolean=false}           options.data.required            => 是否必填
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
var DatePicker = Component.extend({
    name: 'date.picker',
    template: _.compressHtml(template),
    config: function(){
        this.defaults({
            config: [],
            visible: true,
            mode: 0,    // 0: single, 1: range, 2: fix-range
            value4Disp: '',  // 显示值
            value: '',       // 实际值
            placement: 'bottom'
        });

        this.supr();
    },

    init: function() {
        // 根据value初始化datepicker;
        this.$watch('value', function(value) {
            if (!this.data.instance) {
                return this.$update('value4Disp', DateUtil.value2Disp(value, this.data.mode));
            }
            this.updateDate();
        });

        // 根据value4Disp设置value值
        this.$watch('value4Disp', function(value) {
            if (!this.data.instance) { return; }
            this.$update('value', DateUtil.disp2Value(value, this.data.mode));
        });
    },

    updateDate: function() {
        var instance = this.data.instance,
            value = this.data.value,
            mode = this.data.mode,
            start = '',
            end = '';

        if (mode == 0) {
            start = new Date(value);
            end = start;
        } else if (mode == 1 || mode == 2) {
            start = DateUtil.getStartDate(value);
            end = DateUtil.getEndDate(value);
        }
        instance._$setDefault(start, end);
    },

    _initInstance: function() {
        var instance = new DateBody({
            data: {
                config: this.data.config,
                mode: this.data.mode
            }
        });

        instance.$on('change', function(obj) {
            var sender = obj.sender;
            this.$update('value4Disp', sender.data.value4Disp);

            this.$refs.trigger.data.isShow = false;
        }.bind(this));

        instance.$on('destroy', function() {
            this.$refs.trigger.data.isShow = false;
            this.data.instance = null;
        }.bind(this));

        this.data.instance = instance;

        this.updateDate();
    },

    destroy: function() {
        if (this.data.instance) {
            this.data.instance.destroy();
        }
        this.supr();
    },

    getInstance: function() {
        if (!this.data.instance) {
            this._initInstance();
        }
        return this.data.instance;
    },

    reAlign: function() {
        var $alignment = this.$refs.alignment;
        $alignment.reAlign(this.data.bodyEl);
    },

});

module.exports = DatePicker;