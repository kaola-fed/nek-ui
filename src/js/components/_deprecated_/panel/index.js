/**
 * ------------------------------------------------------------
 * Panel     面板
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

/**
 * @class Panel
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {boolean}         [options.data.disabled=false]     => 是否禁用
 * @param {boolean}         [options.data.visible=true]       => 是否显示
 * @param {string}          [options.data.class]              => 补充class
 */
const Panel = Component.extend({
  name: 'panel',
  template,
  $tools: null,
  $foot: null,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      title: '',
      open: true,
    });
    this.supr();

    if (this.$outer && this.$outer.data.panels) {
      this.$outer.data.panels.push(this);
    }
  },
  /**
     * @method toggle(open) 展开/收起
     * @public
     * @param  {boolean} open 展开/收起状态。如果无此参数，则在两种状态之间切换。
     * @return {void}
     */
  toggle(open) {
    if (this.data.disabled) return;

    if (open === undefined) open = !this.data.open;

    if (
      open &&
      this.$outer &&
      this.$outer.data.panels &&
      this.$outer.data.accordion
    ) {
      this.$outer.data.panels.forEach((panel) => {
        panel.data.open = false;
      });
    }

    this.data.open = open;
  },
  stopPropagation(e) {
    e.stopPropagation();
  },
});

module.exports = Panel;
