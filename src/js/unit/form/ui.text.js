/**
 * ------------------------------------------------------------
 * ui.text  文本
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../ui-base/component.js');
var template = require('./ui.text.html');
var _ = require('../../ui-base/_.js');

/**
 * @class Input
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {string='文本'}            options.data.text               <=> 内容
 * @param {string='default'}        options.data.type                => 文本样式
 */
var UIText = Component.extend({
    name: 'ui.text',
    template: template,
    config: function() {
        _.extend(this.data, {
            text: '文本',
            // default/primary/info/success/warning/error
            type: 'default',
        });
        this.supr();
    }
});

module.exports = UIText;
