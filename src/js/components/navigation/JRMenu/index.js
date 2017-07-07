/**
 * ------------------------------------------------------------
 * JRMenu      两级菜单
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');

/**
 * @class Menu
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {boolean}       [options.data.uniqueOpened]             => 是否只保持打开一个菜单
 */
const JRMenu = Component.extend({
  name: 'jr-menu',
  template,
  openedMenus: [],
  currentItem: null,
  /**
   * @protected
   */
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

module.exports = JRMenu;
