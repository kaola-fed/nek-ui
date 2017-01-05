/**
 * ------------------------------------------------------------
 * MenuList  多级菜单列表
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var SourceComponent = require('../../../../ui-base/sourceComponent');
var template = require('./menu.list.html');
var _ = require('../../../../ui-base/_');

/**
 * @class MenuList
 * @extend SourceComponent
 * @private
 */
var MenuList = SourceComponent.extend({
    name: 'menu.list',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            itemTemplate: null,
            // visible: false
        });
        this.supr();

        this.$ancestor = this.$parent.$ancestor;
        this.service = this.$ancestor.service;
        this.data.itemTemplate = this.$ancestor.data.itemTemplate;
    },
    /**
     * @note 移交$ancestor处理
     */
    select: function() {
        this.$ancestor.select.apply(this.$ancestor, arguments);
    }
});

module.exports = MenuList;