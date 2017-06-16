/**
 * ------------------------------------------------------------
 * CrumbItem     面包屑里的每一项
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var template = require('./index.html');
var Crumb = require('../crumb/index.js');
var _ = require('../../../ui-base/_');

/**
 * @class CrumbItem
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 * @param {string}          [options.data.href]                => 传入的链接
 */
var CrumbItem = Component.extend({
    name: 'crumb.item',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
        });
        this.supr();

        if (this.$outer && this.$outer instanceof Crumb) {
            this.$outer.data.crumbArr.push(this);
        }
    }
});

module.exports = CrumbItem;