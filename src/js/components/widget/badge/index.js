/**
 * ------------------------------------------------------------
 * badge  文本
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class Input
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='--'}             options.data.text               <=> 内容
 * @param {boolean=false}           options.data.circle              => 是否圆角
 * @param {string='default'}        options.data.type                => 文本样式
 */
var Badge = Component.extend({
    name: 'badge',
    template: template,
    config: function() {
        _.extend(this.data, {
            text: '--',
            // default/primary/info/success/warning/error
            type: 'default',
            circle: false,
        });
        this.supr();
    },
    onClick: function(e) {
        this.$emit('click', e);
    }
});

module.exports = Badge;
