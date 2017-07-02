/**
 * ------------------------------------------------------------
 * KLSubMenu 
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var template = require('./index.html');
var RootMenuMixin = require('../mixins/rootMenu');

/**
 * @class KLSubMenu
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {boolean}       [options.data.defaultOpen=false]        => 是否默认展开,如果需要默认展开,设置为true
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.titleTemplate]            => 标题文案模板
 */
var KLSubMenu = Component.extend({
  name: 'kl-menu-sub',
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

KLSubMenu.use(RootMenuMixin);

module.exports = KLSubMenu;