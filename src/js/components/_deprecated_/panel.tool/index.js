/**
 * ------------------------------------------------------------
 * PanelTool 面板操作
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const Panel = require('../panel');
const _ = require('../../../ui-base/_');

/**
 * @class Panel
 * @extend Component
 * @param {object}            [options.data]                = 绑定属性
 * @param {boolean}           [options.data.foot=false]     => true: 放在panel_ft的位置; false: 放在头部位置;
 */
const PanelTool = Component.extend({
  name: 'panel.tool',
  /**
   * @protected
   */
  config() {
    _.extend(this.data, {
      foot: false,
    });
    this.supr();

    if (this.$outer && this.$outer instanceof Panel) {
      if (this.data.foot) {
        this.$outer.$foot = this;
      } else {
        this.$outer.$tools = this;
      }
    }
  },
});

module.exports = PanelTool;
