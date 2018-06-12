/**
 * @file KLSidebar
 * @author   sensen(rainforest92@126.com)
 */
const scrollIntoViewFn = require('scroll-into-view');

const Component = require('../../../ui-base/component');
const searchableMixin = require('./mixins/searchable');
const template = require('./index.html');

/**
 * @class KLSidebar
 * @extend Component
 * @param {object}        [options.data]                          => 绑定属性
 * @param {string}        [options.data.class]                    => 补充class
 * @param {array}         [options.data.menus]                    => 菜单数组
 * @param {string}        [options.data.top=60px]                 => 菜单style top的值
 * @param {boolean}       [options.data.uniqueOpened=true]        => 是否只保持打开一个菜单
 * @param {string}        [options.data.titleKey=title]           => 一级菜单的字段key名
 * @param {string}        [options.data.urlKey=url]               => 菜单结构中的链接key名
 * @param {string}        [options.data.routeKey=route]           => 单页spa应用时,使用
 * @param {string}        [options.data.pageKey=title]            => 二级菜单的字段key名
 * @param {string}        [options.data.childrenKey=children]     => 一级菜单对象下二级菜单数组的key名
 * @param {string}        [options.data.todoKey=todos]            => 需要显示待办数量时,需要指定key值
 * @param {object}        [options.data.router]                   => 单页应用时, 请将regular-state的manager实例传入
 * @param {string}        [options.data.width]                    => sidebar的宽度设置,默认181px
 * @param {string}        [options.data.theme]                    => sidebar的主题颜色，可选light/dark，默认light
 * @param {boolean}       [options.data.scrollIntoView=false]     => 是否需要scrollIntoView
 */
const KLSidebar = Component.extend({
  name: 'kl-sidebar',
  template,
  config() {
    this.defaults({
      class: '',
      uniqueOpened: true,
      menus: [],
      titleKey: 'title',
      urlKey: 'url',
      routeKey: 'route',
      pageKey: 'title',
      childrenKey: 'children',
      todoKey: 'todos',
      top: '60px',
      width: '181px',
      theme: 'light',
    });

    this.supr();
  },
  init() {
    const { scrollIntoView } = this.data;
    scrollIntoView && setTimeout(() => {
      scrollIntoViewFn(document.querySelector('.m-sidebar .m-subMenu .m-menuItem.active'), {
        validTarget(target, parentsScrolled) {
          return parentsScrolled < 2 && target !== window && target.matches('.m-menu');
        },
      });
    }, 50);
    this.supr();
  },
  /**
   * @event KLSidebar#menuitem-click 选择某一页时触发
   * @property {object} menuitem 点击的menuItem实例
   */
  onMenuItemClick(e) {
    this.$emit('menuitem-click', e);
  },
  getTitleTemplate(name, todos) {
    const title = this.highlight(name);
    if (todos && !isNaN(todos)) {
      const count = todos > 99 ? '99+' : todos;
      return `<span class="kl-sidebar-todowrap"><span class="kl-sidebar-todowrap__title">${title}</span><span class="kl-sidebar-todowrap__badge">${count}</span></span>`;
    }
    return title;
  },
});

KLSidebar.use(searchableMixin);

module.exports = KLSidebar;
