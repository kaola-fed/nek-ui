/**
 * ------------------------------------------------------------
 * KLIcon     图标
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class KLIcon
 * @extend Component
 * @param {object}          [options.data]                        = 绑定属性
 * @param {string}          [options.data.class]                  => 补充class
 * @param {string}          [options.data.type]                  => 补充class
 * @param {string}          [options.data.fontSize]                  => 设置图标胆小
 * @param {string}          [options.data.color]                  => 设置图标颜色
 */
var KLIcon = Component.extend({
    name: 'kl-icon',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            type: '',
            fontSize: '',
            color: ''
        });
        this.supr();
    },
    onClick: function (e) {
        this.$emit('click', e);
    }
});

module.exports = KLIcon;