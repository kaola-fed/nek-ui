/**
 * ------------------------------------------------------------
 * KLCardTools     卡片组件上的操作区域
 * @author   zianecui@gmail.com
 * ------------------------------------------------------------
 */

const Component = require('../../../../ui-base/component');
const _ = require('../../../../ui-base/_');
const KLCard = require('../index');

/**
 * @class KLCardTools
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
const KLCardTools = Component.extend({
  name: 'kl-card-tools',
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {});
    this.supr();

    if (this.$outer && this.$outer instanceof KLCard) {
      this.$outer.$tools = this;
    }
  },
});

module.exports = KLCardTools;
