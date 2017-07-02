/**
 * ------------------------------------------------------------
 * KLSidebar
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLSidebar
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {array}         [options.data.menus]                    => 菜单数组
 * @param {string}        [options.data.top='60px']               => 菜单style top的值
 * @param {boolean}       [options.data.active=true]              => 默认是否收起
 * @param {string}        [options.data.bodyEl='']                => 主内容区body元素的id,当菜单收起时,拉伸bodyEl
 * @param {boolean}       [options.data.uniqueOpened=true]        => 是否只保持打开一个菜单
 * @param {string}        [options.data.titleKey=title]           => 一级菜单的字段key名
 * @param {string}        [options.data.urlKey="url"]             => 菜单结构中的链接key名
 * @param {string}        [options.data.pageKey="title"]          => 二级菜单的字段key名
 * @param {string}        [options.data.childrenKey="children"]   => 一级菜单对象下二级菜单数组的key名
 */
const KLSidebar = Component.extend({
  name: 'kl-sidebar',
  template,
  /**
   * @protected
   */
  config() {
    this.defaults({
      class: '',
      uniqueOpened: true,
      menus: [],
      titleKey: 'title',
      urlKey: 'url',
      pageKey: 'title',
      childrenKey: 'children',
      top: '60px',
      active: true,
      bodyEl: '',
    });

    this.supr();
  },
  initBodyEl() {
    if (this.data.bodyEl) {
      this.data.$bodyEl = document.getElementById(this.data.bodyEl);
      if (this.data.$bodyEl) {
        this.data.$bodyEl.style.transition = 'left .3s';
      }
    }
  },
  toggle() {
    this.initBodyEl();

    this.data.active = !this.data.active;
    if (this.data.$bodyEl) {
      this.data.$bodyEl.style.left = this.data.active ? '180px' : '0';
    }
  },
});

KLSidebar.directive('top', function (ele, value) {
  this.$watch(value, (top) => {
    ele.style.top = top;
  });
});

module.exports = KLSidebar;
