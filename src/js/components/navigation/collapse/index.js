/**
 * ------------------------------------------------------------
 * Collapse  折叠面板
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

var Panel = require('../../layout/panel');

/**
 * @class Collapse
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性
 * @param {boolean}           [options.data.accordion=false]      => 是否每次只展开一个
 * @param {boolean}           [options.data.disabled=false]       => 是否禁用
 * @param {boolean}           [options.data.visible=true]         => 是否显示
 * @param {string}            [options.data.class]                => 补充class
 */
var Collapse = Component.extend({
    name: 'collapse',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            panels: [],
            accordion: false
        });
        this.supr();
    }
});

module.exports = Collapse;