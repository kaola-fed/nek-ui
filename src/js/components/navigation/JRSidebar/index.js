/**
 * ------------------------------------------------------------
 * JRSidebar
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class JRSidebar
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {array}         [options.data.menus]                    => 菜单数组
 * @param {string}        [options.data.top='60px']               => 菜单style top的值
 * @param {boolean}       [options.data.active=true]              => 默认是否收起
 * @param {string}        [options.data.bodyEl='']                => 主内容区body元素的id,当菜单收起时,拉伸bodyEl
 * @param {boolean}       [options.data.uniqueOpened=true]        => 是否只保持打开一个菜单
 * @param {string}        [options.data.titleKey=title]           => 一级菜单的字段key名
 * @param {string}        [options.data.urlKey='url']             => 菜单结构中的链接key名
 * @param {string}        [options.data.pageKey="title"]          => 二级菜单的字段key名
 * @param {string}        [options.data.moduleKey='module']       => 菜单结构中的模块key名
 * @param {string}        [options.data.childrenKey="children"]   => 一级菜单对象下二级菜单数组的key名
 * @param {string}        [options.data.menus[index].icon]        => 菜单是否有icon，不填写则不显示
 * @param {string}        [options.data.menus[index].open]        => 是否选择当前菜单
 */
const JRSidebar = Component.extend({
  name: 'jr-sidebar',
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
  /**
     * @method select(item) 选择某一菜单
     * @public
     * @param  {object} item 选择项
     * @return {void}
     */
  selecteItem(item) {
    if (!item || typeof item !== 'string') {
      return;
    }
    const m = [];
    this.data.menus.forEach((l) => {
      if (l.children && l.children.length) {
        l.children.forEach((k) => {
          k.parent = l;
          m.push(k);
        });
      } else {
        m.push(l);
      }
    });
    if (!m.length) {
      return '';
    }

    // 这样写打包工具会把m和it打包成一个变量
    // m.forEach((it) => {
    //   it.open = it.module === item || it.url === item;
    // });
    let currentParent = '';
    for (let i = 0; i < m.length; i += 1) {
      m[i].open = m[i].module === item || m[i].url === item;
      if (m[i].open && m[i].parent) {
        currentParent = m[i].parent;
      }
      if (m[i].parent.title === currentParent.title) {
        m[i].parent.open = true;
      } else if (this.data.uniqueOpened) {
        m[i].parent.open = false;
      }
    }
  },
});

JRSidebar.directive('top', function (ele, value) {
  this.$watch(value, (top) => {
    ele.style.top = top;
  });
});

module.exports = JRSidebar;
