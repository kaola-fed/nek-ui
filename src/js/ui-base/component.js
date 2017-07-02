/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Regular = require('regularjs');
var polyfill = require('./polyfill');
var _ = require('./_');
var filter = require('./filter');
var directive = require('./directive');
var animation = require('./animation');

/**
 * @class Component
 * @extend Regular
 * @param {boolean}       [options.data.readonly=false]     => 是否只读
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用
 * @param {boolean}       [options.data.visible=true]       => 是否显示
 * @param {string}        [options.data.class]              => 补充class
 */
var Component = Regular.extend({
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            readonly: false,
            disabled: false,
            visible: true,
            // zh-CN, en-US
            lang: 'zh-CN',
            'class': '',
            console: typeof console === 'undefined' ? undefined : console
        });
        this.supr();
    },
    /**
     * @protected
     */
    defaults: function(data) {
      this.data = Object.assign(data, this.data);
    },
    /**
     * @protected
     */
    rules: function(attris) {
      this.data = Object.assign(attris, this.data);
    },
    /**
     * @protected
     */
    reset: function() {
        this.data = {};
        this.config();
    },
    $trans: function(key) {
        return _.$trans(key, this);
    },
})
.filter(filter)
.directive(directive);

animation.install(Regular);

module.exports = Component;