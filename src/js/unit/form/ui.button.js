/**
 * ------------------------------------------------------------
 * ui.button  按钮
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./ui.button.html');
var _ = require('../../ui-base/_.js');

/**
 * @class Input
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='点我'}            options.data.title               => 按钮标题
 * @param {string='default'}        options.data.type                => 按钮样式
 * @param {string=''}               options.data.size                => 按钮大小
 * @param {string=''}               options.data.action              => 按钮操作类型
 */
var UIButton = Component.extend({
    name: 'ui.button',
    template: template,
    config: function() {
        _.extend(this.data, {
            title: '点我',
            // default/primary/info/success/warning/error
            type: 'default',
        });
        this.supr();
    }
});

module.exports = UIButton;
