/**
 * ------------------------------------------------------------
 * JRSubMenu
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const RootMenuMixin = require('../mixins/rootMenu');

/**
 * @class JRSubMenu
 * @extend Component
 * @param {object}        [options.data]                          = 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {boolean}       [options.data.defaultOpen=false]        => 是否默认展开,如果需要默认展开,设置为true
 * @param {string}        [options.data.title]                    => 标题文案
 * @param {string}        [options.data.titleTemplate]            => 标题文案模板
 * @param {boolean}       [options.data.icon]                     => 菜单前面的icon,默认不显示
 */
const JRSubMenu = Component.extend({
  name: 'jr-menu-sub',
  template,
  /**
   * @protected
   */
  config() {
    this.defaults({
      class: '',
      title: '',
      titleTemplate: '',
    });
    this.$watch('defaultOpen', (defaultOpen) => {
      if (defaultOpen) {
        const menus = this.data.rootMenu.openedMenus;
        if (menus.indexOf(this) > -1) {
          menus.splice(menus.indexOf(this), 1);
        }
        this.data.active = true;
        this.toggle();
      }
    });
    this.supr();
  },
  computed: {
    active() {
      if (!this.data.rootMenu) return;
      return this.data.rootMenu.openedMenus.indexOf(this) > -1;
    },
  },
  init() {
    this.initRootMenu();
    //  if (this.data.defaultOpen) {
    //    this.data.rootMenu.openedMenus.push(this);
    //  }
  },
  toggle() {
    this.data.rootMenu.$emit('submenu-click', this);
    this.$emit('click', this);
  },
});

JRSubMenu.use(RootMenuMixin);

module.exports = JRSubMenu;
