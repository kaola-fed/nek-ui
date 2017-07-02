/**
 * ------------------------------------------------------------
 * Component 组件基类
 * @author   sensen(rainforest92@126.com)
 * ------------------------------------------------------------
 */

const Regular = require('regularjs');
const _ = require('./_');
const filter = require('./filter');
const directive = require('./directive');
const animation = require('./animation');

/**
 * @class Component
 * @extend Regular
 * @param {boolean}       [options.data.readonly=false]     => 是否只读
 * @param {boolean}       [options.data.disabled=false]     => 是否禁用
 * @param {boolean}       [options.data.visible=true]       => 是否显示
 * @param {string}        [options.data.class]              => 补充class
 */
const Component = Regular.extend({
  /**
     * @protected
     */
  config() {
    _.extend(this.data, {
      readonly: false,
      disabled: false,
      visible: true,
      // zh-CN, en-US
      lang: 'zh-CN',
      class: '',
      console: typeof console === 'undefined' ? undefined : console,
    });
    this.supr();
  },
  /**
     * @protected
     */
  defaults(data) {
    this.data = Object.assign(data, this.data);
  },
  /**
     * @protected
     */
  rules(attris) {
    this.data = Object.assign(attris, this.data);
  },
  /**
     * @protected
     */
  reset() {
    this.data = {};
    this.config();
  },
  $trans(key) {
    return _.$trans(key, this);
  },
})
  .filter(filter)
  .directive(directive);

animation.install(Regular);

module.exports = Component;
