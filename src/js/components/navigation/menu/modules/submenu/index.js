/**
 * ------------------------------------------------------------
 * Menu      多级菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../../ui-base/component');
var template = require('./index.html');
var RootMenuMixin = require('../../mixins/rootMenu');

/**
 * @class SubMenu
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {boolean=false} [options.data.defaultOpen]              => 是否默认展开,如果需要默认展开,设置为true
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.titleTemplate]            => 标题文案模板
 */
var SubMenu = Component.extend({
  name: 'menu.sub',
  template: template,
  /**
   * @protected
   */
  config: function() {
    this.defaults({
      class: '',
      title: '',
      titleTemplate: '',
    });
    this.supr();
  },
  computed: {
    'active': function() {
      if (!this.data.rootMenu) return;
      return this.data.rootMenu.openedMenus.indexOf(this) > -1;
    },
  },
  init: function() {
    this.initRootMenu();

    if (this.data.defaultOpen) {
     this.data.rootMenu.openedMenus.push(this);
    }
  },
  toggle: function() {
    this.data.rootMenu.$emit('submenu-click', this);
    this.$emit('click', this);
  }
});

SubMenu.use(RootMenuMixin);

module.exports = SubMenu;