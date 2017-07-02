/**
 * ------------------------------------------------------------
 * KLTab       子选项卡
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var _ = require('../../../../ui-base/_');
var KLTabs = require('../index');

/**
 * @class KLTab
 * @extend Component
 * @param {object}        [options.data]                      = 绑定属性
 * @param {object}        [options.data.title='']             => 标题
 * @param {string}        [options.data.key=null]             => key 标识
 */
var KLTab = Component.extend({
    name: 'kl-tab',
    template: '<div r-hide={this.$outer.data.selected !== this}>{#inc this.$body}</div>',
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            title: ''
        });
        this.supr();

        if(this.$outer && this.$outer instanceof KLTabs)
            this.$outer.data.tabs.push(this);

        if(!this.$outer.data.selected)
            this.$outer.data.selected = this;

        this._setDefaultTab();
    },

    _setDefaultTab: function() {
        var defaultKey = this.$outer.data.defaultKey,
            key = this.data.key;

        if (!!defaultKey && !!key && defaultKey + '' === key + '') {
            this.$outer.data.selected = this;
        }
    },
});

module.exports = KLTab;