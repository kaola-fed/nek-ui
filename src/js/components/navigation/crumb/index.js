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
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 * @param {boolean}          [options.data.isShowHome]               => 是否展示首页图标
 */
var Crumb = Component.extend({
    name: 'ui.crumb',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            isShowHome: true,
            separator: '/'
        });
        this.supr();
    }
});

module.exports = Crumb;