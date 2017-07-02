/**
 * ------------------------------------------------------------
 * KLCrumbItem     面包屑里的每一项
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var template = require('./index.html');
var _ = require('../../../../ui-base/_');

/**
 * @class KLCrumbItem     
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 * @param {string}          [options.data.href]                => 传入的链接
 */
var KLCrumbItem = Component.extend({
    name: 'kl-crumb-item',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
        });
        this.supr();

        if (this.$outer && this.$outer.name === 'kl-crumb') {
            this.$outer.data.crumbArr.push(this);
        }
    }
});

module.exports = KLCrumbItem;