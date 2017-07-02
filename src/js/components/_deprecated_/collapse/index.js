/**
 * ------------------------------------------------------------
 * Collapse  折叠面板
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Component = require('../../../ui-base/component');
const template = require('./index.html');
const _ = require('../../../ui-base/_');

const Panel = require('../panel');

/**
 * @class Collapse
 * @extend Component
 * @param {object}            [options.data]                      = 绑定属性
 * @param {boolean}           [options.data.accordion=false]      => 是否每次只展开一个
 * @param {boolean}           [options.data.disabled=false]       => 是否禁用
 * @param {boolean}           [options.data.visible=true]         => 是否显示
 * @param {string}            [options.data.class]                => 补充class
 */
const Collapse = Component.extend({
  name: 'collapse',
  template,
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      panels: [],
      accordion: false,
    });
    this.supr();
  },
});

module.exports = Collapse;
