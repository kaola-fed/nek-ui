/**
 * ------------------------------------------------------------
 * KLCardTools     卡片组件上的操作区域
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var _ = require('../../../../ui-base/_');
var KLCard = require('../index');

/**
 * @class KLCardTools
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
var KLCardTools = Component.extend({
    name: 'kl-card-tools',
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
        });
        this.supr();

        if (this.$outer && this.$outer instanceof KLCard) {
            this.$outer.$tools = this;
        }
    }
});

module.exports = KLCardTools;