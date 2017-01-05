/**
 * ------------------------------------------------------------
 * ui.text  文本
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
 * @param {string='文本'}            options.data.text               <=> 内容
 * @param {string=''}               options.data.size                => 大小
 * @param {boolean=false}           options.data.isBold              => 是否加粗
 * @param {string=''}               options.data.align               => 左右对齐方式
 * @param {string=''}               options.data.vertical            => 上下对齐方式
 * @param {string='default'}        options.data.type                => 文本样式
 */
var UIText = Component.extend({
    name: 'ui.text',
    template: template,
    config: function() {
        _.extend(this.data, {
            text: '--',
            // default/primary/info/success/warning/error
            type: 'default',
            // xs/sm/lg/xl
            size: '',
            isBold: false,
            // tal/tac/tar/taj
            align: '',
            // vat/vam/vab
            vertical: '',
        });
        this.supr();
    }
});

module.exports = UIText;
