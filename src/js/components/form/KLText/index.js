/**
 * ------------------------------------------------------------
 * KLText  文本
 * @author   Cody Chan<int64ago@gmail.com>
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class KLText
 * @extend Component
 * @param {object}      [options.data]                = 绑定属性
 * @param {string}      [options.data.text=文本]      <=> 内容
 * @param {string}      [options.data.size]           => 大小
 * @param {boolean}     [options.data.isBold=false]   => 是否加粗
 * @param {string}      [options.data.align]          => 左右对齐方式
 * @param {string}      [options.data.vertical]       => 上下对齐方式
 * @param {string}      [options.data.type=default]   => 文本样式
 */
var KLText = Component.extend({
    name: 'kl-text',
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
            url: 'javascript:;',
            target: ''
        });
        this.supr();
    },
    onClick: function(e) {
        this.$emit('click', e);
    }
});

module.exports = KLText;
