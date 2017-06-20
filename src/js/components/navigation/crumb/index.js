/**
 * ------------------------------------------------------------
 * Card     面包屑
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

/**
 * @class Panel
 * @extend Component
 * @param {object}          [options.data]                     = 绑定属性
 * @param {string}          [options.data.class]               => 补充class
 * @param {string}          [options.data.separator]           => 分隔符，支持模板
 * @param {string}          [options.data.class]               => kl-crumb-item的属性：补充class
 * @param {string}          [options.data.href]                => kl-crumb-item的属性：传入的链接
 */
var KLCrumb = Component.extend({
    name: 'kl-crumb',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            separator: '/',
            crumbArr: []
        });
        this.supr();
    }
});

module.exports = KLCrumb;