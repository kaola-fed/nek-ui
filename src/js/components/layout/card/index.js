/**
 * ------------------------------------------------------------
 * Card     卡片
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
 */
var Card = Component.extend({
    name: 'card',
    template: template,
    $tools: null,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: '',
            isShowLine: true,
            isShowBtLine: false,
            isIndent: true,
        });
        this.supr();

    }
});

module.exports = Card;