/**
 * ------------------------------------------------------------
 * KLMenuItem 
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

'use strict';

var Component = require('../../../../ui-base/component');
var template = require('./index.html');
var RootMenuMixin = require('../mixins/rootMenu');

/**
 * @class KLMenuItem
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.url]                      => 跳转链接
 * @param {boolean}       [options.data.isCurrent]                => 是否是当前页
 */
var KLMenuItem = Component.extend({
  name: 'kl-menu-item',
  template: template,
  /**
   * @protected
   */
  config: function() {
    this.defaults({
      class: '',
      title: '',
      active: false,
      url: '',
    });

    this.supr();
  },
  computed: {
    'active': function() {
      if (!this.data.rootMenu) return;
      return this.data.rootMenu.currentItem == this;
    }
  },
  init: function() {
    this.initRootMenu();

    if (this.data.isCurrent) {
      this.data.rootMenu.currentItem = this;
    }
  },
  goto: function(e) {
    e.stopPropagation();
    this.data.rootMenu.$emit('menuitem-click', this);
    if (this.data.url) {
      location.href= this.data.url;
    }
  }
});

KLMenuItem.use(RootMenuMixin);
module.exports = KLMenuItem;