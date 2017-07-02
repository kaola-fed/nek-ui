'use strict';

var _ = require('../../../ui-base/_');
var ajax = require('../../../ui-base/ajax');
var Validation = require('../../../util/validation');
var ValidationMixin = require('../../../util/validationMixin');

var template = require('./index.html');

/**
 * @class UIForm
 * @extend Validation
 * @param {object}      [options.data]                    = 绑定属性
 * @param {string}      [options.data.service]            => 全站异步获取source的接口地址
 * @param {string}      [options.data.class]              => 扩展样式
 * @param {boolean}     [options.data.inline='']          => 如果true,kl-form-item按照inline-block排列
 * @param {string}      [options.data.sourcePath=data]    => 获取到select数据后,读取json数据的路径
 * @param {string|number} [options.data.labelSize='']     => 批量设置kl-form-item的labelSize,取值与kl-form-item的labelSize相同
 * @param {string|number} [options.data.labelLineHeight='']  => 批量设置kl-form-item的labelLineHeight,取值与kl-form-item的labelLineHeight相同
 */
var KLForm = Validation.extend({
    name: 'kl-form',
    template: template,
    selectors: [],
    config: function (data) {

        _.extend(data, {
            service: null,
            sourcePath: 'data',
            class: ''
        });

        this.supr(data);
    },
    init: function() {
        this.supr();

        this.initValidation();

        this.$watch('this.controls.length', function() {
          this.initSelectorSource();
          this.initFormItem();
        });
    },
    initFormItem: function() {
        var controls = this.controls,
            labelSize = this.data.labelSize,
            labelLineHeight = this.data.labelLineHeight;
        labelSize && controls.forEach(function($component) {
            if (!$component.labelSize) {
              $component.$update('labelSize', labelSize);
            }
        });
        labelLineHeight && controls.forEach(function($component) {
            if (!$component.labelLineHeight) {
              $component.$update('labelLineHeight', labelLineHeight);
            }
        });
    },
    initSelectorSource: function() {
        var controls = this.controls;
        this.selectors = controls.filter(function($formitem) {
            return !!$formitem.data.sourceKey;
        });

        if (!this.data.service || !this.selectors.length) { return; }

        this.__reqSource();
    },
    __getSourceKeys: function() {
        return this.selectors.map(function($formitem) {
            return $formitem.data.sourceKey;
        })
    },
    __reqSource: function() {
        var self = this;
        var keys = this.__getSourceKeys();

        window.NEKSelects = window.NEKSelects || {};
        keys = keys.filter(function(key) { return !window.NEKSelects[key]; });

        this.selectors.forEach(function($formitem) {
            var key = $formitem.data.sourceKey;
            var source = window.NEKSelects[key] || [];
            self.__updateSource($formitem, key, source);
        });


        if (!keys.length) { return; }
        this.keys = keys;
        ajax.request({
            url: this.data.service,
            method: 'get',
            type: 'json',
            data: {
                keys:keys.join(',')
            },
            success: this.__cbReqSource.bind(this)
        })
    },
    __cbReqSource: function(json) {
        var self = this;
        var keys = this.keys,
            path = this.data.sourcePath,
            result = path === '' ? json : json[path];

        result = result || {};

        this.selectors.forEach(function($formitem) {
            var key = $formitem.data.sourceKey;
            var source = result[key] || [];
            self.__updateSource($formitem, key, source);
        });
        /**
           * @event sourceCompleted kl-form自动获取sourceKey异步数据后触发
           * @property {object} sender 事件发送对象
           * @property {object} result 所有异步数据
           */
        this.$emit('sourceCompleted', {
            sender: this,
            result: window.NEKSelects
        });
    },
    __updateSource: function($formitem, key, source) {
        var $selectItem = $formitem.controls[0];

        /* 三种情况不给组件赋值:1. kl-form-item下面没有选项组件; 2. source为空 3. 选项组件的source属性已经有值 */
        if (!$selectItem || !source.length || $selectItem.data.source.length) return;
        $selectItem.data.source =  _.clone(source);
        window.NEKSelects[key] = _.clone(source);
        $selectItem.$update();
    }
});

KLForm.use(ValidationMixin);

module.exports = KLForm;