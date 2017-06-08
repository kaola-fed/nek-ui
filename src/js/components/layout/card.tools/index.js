/**
 * ------------------------------------------------------------
 * Card     卡片组件上的操作区域
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../ui-base/component');
var _ = require('../../../ui-base/_');
var Card = require('../card');

/**
 * @class Panel
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
var CardTools = Component.extend({
    name: 'card.tools',
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
        });
        this.supr();

        if (this.$outer && this.$outer instanceof Card) {
            this.$outer.$tools = this;
        }
    }
});

module.exports = CardTools;