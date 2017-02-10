/**
 * ------------------------------------------------------------
 * Menu      多级菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Dropdown = require('../dropdown');
var template = require('./index.html');
var _ = require('../../../ui-base/_');

var MenuList = require('./common/menu.list')

/**
 * @class Menu
 * @extend Dropdown
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.title]                    => 按钮文字
 * @param {object[]}      [options.data.source=[]]                <=> 数据源
 * @param {string}        [options.data.source[].name]            => 每项的内容
 * @param {boolean}       [options.data.source[].disabled=false]  => 禁用此项
 * @param {boolean}       [options.data.source[].divider=false]   => 设置此项为分隔线
 * @param {string}        [options.data.itemTemplate=null]        @=> 单项模板
 * @param {boolean}       [options.data.open=false]               <=> 当前为展开/收起状态
 * @param {boolean}       [options.data.disabled=false]           => 是否禁用
 * @param {boolean}       [options.data.visible=true]             => 是否显示
 * @param {string}        [options.data.class]                    => 补充class
 * @param {object}        [options.service]                       @=> 数据服务
 */
var Menu = Dropdown.extend({
    name: 'menu',
    template: template,
    /**
     * @protected
     */
    config: function() {
        _.extend(this.data, {
            // @inherited source: [],
            open: false
        });
        this.supr();

        this.$ancestor = this;
    }
});

module.exports = Menu;