/**
 * ------------------------------------------------------------
 * @file KLAside 侧边栏
 * @author mingmingcn.yang@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../../ui-base/_');

/**
 * @class KLAside
 * @extend Component
 * @param {string}           [options.width]                        => 侧栏宽度
 * @param {boolean}          [options.showFold]                     => 是否开启折叠功能，默认true
 * @param {boolean}          [options.active]                       => 若开启折叠功能，初始展开状态，默认他true

 */
const KLAside = Component.extend({
  name: 'kl-aside',
  template,
  config() {
    this.defaults({
      width: '200px',
      showFold: true,
      active: true,
    });
    this.supr();
  },
  initBodyEl() {
    if (this.data.showFold) {
      this.data.$bodyEl = _.dom.element(this.$outer.bodyEl);
      if (this.data.$bodyEl) {
        this.data.$bodyEl.style.transition = 'left .3s';
      }
    }
  },
  toggle() {
    this.initBodyEl();

    this.data.active = !this.data.active;
    const { width } = this.data;
    if (this.data.$bodyEl) {
      this.data.$bodyEl.style.left = this.data.active ? width : '0';
    }

    /**
     * @event KLSidebar#toggle 收缩菜单时触发
     * @property {boolean} active 展开还是收缩
     */
    this.$emit('toggle', this.data.active);
  },
});

module.exports = KLAside;
