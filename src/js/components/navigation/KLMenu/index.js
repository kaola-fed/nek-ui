/**
 * @file KLMenu      导航菜单
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class KLMenu
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {boolean}       [options.data.uniqueOpened]             => 是否只保持打开一个菜单
 * @param {object}        [options.data.router]                   => 单页应用时, 请将regular-state的manager实例传入
 */

/**
 * @class KLSubMenu
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {boolean}       [options.data.defaultOpen=false]        => 是否默认展开,如果需要默认展开,设置为true
 * @param {string}        [options.data.url]                   => 如果一级菜单需要链接,可配置url属性
 * @param {string}        [options.data.route]                   => 单页spa应用时替代url属性
 * @param {string}        [options.data.iconClass]             => 菜单文字前的icon
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.titleTemplate]            => 标题文案模板
 */

/**
 * @class KLMenuItem
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.url]                      => 跳转链接
 * @param {string}        [options.data.route]                    => 单页spa应用时替代url属性
 * @param {boolean}       [options.data.isCurrent]                => 是否是当前页
 */

const KLMenu = Component.extend({
  name: 'kl-menu',
  template,
  openedMenus: [],
  currentItem: null,
  config() {
    this.defaults({
      class: '',
      uniqueOpened: true,
    });
    this.supr();
  },
  init() {
    this.$on('submenu-click', function (submenu) {
      const isOpened = this.openedMenus.indexOf(submenu) !== -1;
      if (isOpened) {
        this.closeMenu(submenu);
        this.$emit('close', submenu);
      } else {
        this.openMenu(submenu);
        this.$emit('open', submenu);
      }
    });

    /**
     * @event KLMenu#menuitem-click 选择某一页时触发
     * @property {object} menuitem 点击的menuItem实例
     */
    this.$on('menuitem-click', function (menuitem) {
      this.currentItem = menuitem;
    });
  },
  closeMenu(submenu) {
    this.openedMenus.splice(this.openedMenus.indexOf(submenu), 1);
  },
  openMenu(submenu) {
    const openedMenus = this.openedMenus;
    if (openedMenus.indexOf(submenu) !== -1) return;
    if (this.data.uniqueOpened) {
      this.openedMenus = [].concat(submenu);
    } else {
      this.openedMenus.push(submenu);
    }
  },
});

module.exports = KLMenu;
