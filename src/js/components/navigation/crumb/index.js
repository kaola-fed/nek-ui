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
 * @param {string}          [options.data.list]               => 面包屑的每一项的配置
 * @param {string}          [options.data.separator]          => 分隔符自定义
 */
var Crumb = Component.extend({
    name: 'ui.crumb',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            separator: '/'
        });
        this.supr();
    }
});

module.exports = Crumb;