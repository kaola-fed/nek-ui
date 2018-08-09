/**
 * ------------------------------------------------------------
 * Input   输入扩展
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');

/**
 * @class UIGroup
 * @extend Component
 * @param {object}          [options.data]                    = 绑定属性
 * @param {string}          [options.data.class]              => 补充class
 */
const UIGroup = Component.extend({
  name: 'ui.group',
  template: '<span class="kl-old-group {class}">{#inc this.$body}</span>',
  /**
     * @protected
     */
  config() {
    this.defaults({});

    this.supr();
  },
});

module.exports = UIGroup;
